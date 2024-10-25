import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertDestructive } from "./AlertDestructive";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/auth";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function MyProfile() {
  const [error, setError] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setLoggedUser(currentUser);
    } else {
      setLoggedUser(null);
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleSignout = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signOut();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
    setIsLoading(false);
  };

  return (
    <div>
      {loggedUser ? (
        <section className="m-8 min-w-56">
          <div className="auth_container">
            <div className="w-100" style={{ maxHeight: "400px" }}>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle className="text-center mb-4">Profile</CardTitle>
                  {error && <AlertDestructive msg={error} />}
                </CardHeader>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <CardContent className="flex flex-col md:flex-row gap-2 ">
                    <h2 className="font-bold">Email:</h2>
                    <p>{loggedUser.email}</p>
                  </CardContent>
                )}
                <div className="w-100 text-center m-2">
                  <Button
                    variant="destructive"
                    disabled={isLoading}
                    onClick={handleSignout}
                    aria-label="logout"
                  >
                    {isLoading ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      ) : (
        <section className="m-8 min-w-56">
          <div className="auth_container">
            <div className="w-100" style={{ maxHeight: "400px" }}>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle className="text-center mb-4">Profile</CardTitle>
                  {error && <AlertDestructive msg={error} />}
                </CardHeader>
                <CardContent className="text-center gap-2">
                  <p>Signed Out</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
