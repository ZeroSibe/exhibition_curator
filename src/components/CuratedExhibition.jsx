import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertDestructive } from "./AlertDestructive";
import {
  collection as firebaseCollection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Button } from "./ui/button";
import LoadingSpinner from "./LoadingSpinner";

export default function CuratedExhibition() {
  const { currentUser, userLoggedIn } = useAuth();
  const [myExhibitions, setMyExhibitions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const exhibitionsDb = firebaseCollection(db, "Exhibitions");

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    if (currentUser) {
      const fetchExhibitions = async () => {
        setIsLoading(true);
        try {
          setError("");
          const userId = currentUser.uid;
          const q = query(exhibitionsDb, where("user_id", "==", userId));
          const querySnapshot = await getDocs(q);

          const exhibitions = querySnapshot.docs.map((doc) => ({
            exhibitionId: doc.id,
            ...doc.data(),
          }));
          setMyExhibitions(exhibitions);
          setIsLoading(false);
        } catch (error) {
          setError("Could not retreive exhibition.Please try again later.");
          setIsLoading(false);
        }
      };

      fetchExhibitions();
    }
  }, [currentUser]);

  const handleViewExhibition = (exhibitionId) => {
    navigate(`/curated-exhibition/${exhibitionId}`);
  };

  const handleDelete = async (exhibitionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exhibition?"
    );
    if (!confirmDelete) return;

    try {
      setError("");
      setIsLoading(true);

      await deleteDoc(doc(db, "Exhibitions", exhibitionId));

      setMyExhibitions((prevExhibitions) =>
        prevExhibitions.filter(
          (exhibition) => exhibition.exhibitionId !== exhibitionId
        )
      );
      setIsLoading(false);
    } catch (error) {
      setError("Could not delete the exhibition...Please try again later.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="auth_container">
      {error && <AlertDestructive msg={error} />}
      {myExhibitions.length > 0 ? (
        <section className="w-100" style={{ maxHeight: "400px" }}>
          {myExhibitions.map((exhibition) => (
            <div
              className="w-100"
              style={{ maxHeight: "400px" }}
              key={exhibition.exhibitionId}
            >
              <Card className="min-w-96">
                <CardHeader>
                  <CardTitle className="text-center m-2">
                    {exhibition.exhibition_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="button-container"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      onClick={() =>
                        handleViewExhibition(exhibition.exhibitionId)
                      }
                    >
                      View Exhibition
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(exhibition.exhibitionId)}
                    >
                      Delete Exhibition
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>
      ) : (
        <h2 className="text-[18px]">No Exhibition Created Yet</h2>
      )}
    </div>
  );
}
