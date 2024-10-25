import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtCollectionTwoCard from "./ArtCollectionTwoCard";
import { CollectionContext } from "../contexts/Collection";
import ArtCollectionOneCard from "./ArtCollectionOneCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  collection as firebaseCollection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { db } from "@/firebase";

import "./ArtCollection.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AlertDestructive } from "./AlertDestructive";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { reduceCollections } from "@/utils/utils";
import { AlertSuccess } from "./AlertSuccess";
import LoadingSpinner from "./LoadingSpinner";

export default function MyCollection() {
  const { collection, setCollection } = useContext(CollectionContext);
  const { userLoggedIn, currentUser } = useAuth();
  const [exhibitionName, setExhibitionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const exhibitionsDb = firebaseCollection(db, "Exhibitions");

  const flattenedArtworks = reduceCollections(collection);

  const handleExhibition = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);
    if (collection.length === 0) {
      setIsLoading(false);
      return setError(
        "Your collection is empty. Please add an artwork to your collection first."
      );
    }
    if (!exhibitionName) {
      setIsLoading(false);
      return setError("Please provide a name for your exhibiton");
    }

    if (!userLoggedIn) {
      setError("You are not logged in, please log in and try again");
      setIsLoading(false);
      return;
    }

    const userId = currentUser?.uid;

    getDocs(query(exhibitionsDb, where("user_id", "==", userId)))
      .then((response) => {
        return response.size;
      })
      .then((size) => {
        if (size < 1) {
          return addDoc(exhibitionsDb, {
            artworks: flattenedArtworks,
            exhibition_name: exhibitionName,
            user_id: userId,
          });
        } else {
          return Promise.reject({
            status: 403,
            msg: "You have already created your Exhibition. Delete you current exhibition to continue",
          });
        }
      })
      .then((docRef) => {
        const exhibitionId = docRef.id;
        setCollection([]);
        setMessage(
          "Exhibition created. View your exhibition in Curated Exhibition"
        );
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.status === 403) {
          setError(err.msg);
          setIsLoading(false);
          return;
        }
        setError("Could not create exhibition...Please try again later");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-[30px] font-bold py-20 px-10">My Collection</h1>
      <section className="m-8 min-w-56">
        <Card>
          <CardHeader>
            <CardTitle className="text-center mb-2">
              Create My Exhibition
            </CardTitle>
            {error && <AlertDestructive msg={error} />}
            {message && <AlertSuccess msg={message} />}
            {!userLoggedIn && (
              <CardDescription className="text-center mb-4">
                Login to curate your exhibition
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExhibition}>
              <Label htmlFor="exhibitionName">Exhibition Name</Label>
              <Input
                id="exhibitionName"
                required
                type="text"
                placeholder="Enter the exhibition name"
                aria-label="input exhibition name"
                value={exhibitionName}
                onChange={(e) => setExhibitionName(e.target.value)}
              />
              <div className="centered_btn mt-4">
                <Button disabled={isLoading || !userLoggedIn} type="submit">
                  {isLoading ? "Creating Exhibition..." : "Create Exhibition"}
                </Button>
              </div>
            </form>
            {isLoading && <LoadingSpinner />}
          </CardContent>
        </Card>
      </section>
      {collection.length > 0 ? (
        <section className="m-8 min-w-56">
          {collection.length > 1 ? (
            <h2 className="text-[20px] font-bold text-center">
              {collection.length} Artworks in your collection
            </h2>
          ) : (
            <h2 className="text-[20px] font-bold text-center">
              {collection.length} Artwork in your collection
            </h2>
          )}
          <ul className="wrapper max-h-[500px] overflow-y-auto space-y-4 p-4">
            {collection.map(({ artwork, collection_type }) => {
              return collection_type === "two" ? (
                <li key={artwork.id}>
                  <ArtCollectionTwoCard artwork={artwork} />
                </li>
              ) : (
                <li key={artwork.systemNumber}>
                  <ArtCollectionOneCard artwork={artwork} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <section className="centered-section">
          <h2 className="text-[20px] font-bold">Your Collection is Empty</h2>
          <p className="m-1 text-center">
            But it doesn't have to be...start collecting artworks and create
            your own exhibition!
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => navigate("/collections")}
            aria-label="go to Collections"
          >
            Start Collecting
          </Button>
        </section>
      )}
    </div>
  );
}
