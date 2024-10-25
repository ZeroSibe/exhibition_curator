import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { passwordReset } from "@/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

import "./SignUp.css";
import { AlertDestructive } from "./AlertDestructive";
import LoadingSpinner from "./LoadingSpinner";
import { AlertSuccess } from "./AlertSuccess";

export default function ForgotPassward() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/my-profile");
    }
  }, [userLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return setError("Please provide the email you used to login");
    }
    try {
      setMessage("");
      setError("");
      setIsLoading(true);
      await passwordReset(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError(
        "Failed to reset. Please check if you have provided the correct email."
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="auth_container" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxHeight: "400px" }}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center mb-2">Forgot Passward?</CardTitle>
            {error && <AlertDestructive msg={error} />}
            {message && <AlertSuccess msg={message} />}
            <CardDescription className="text-center mb-4">
              Please enter the email you used to sign log in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    required
                    type="email"
                    placeholder="Enter your email address"
                    aria-label="input email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="centered_btn mt-4">
                <Button disabled={isLoading} className="w-100" type="submit">
                  {isLoading ? "Resetting password..." : "Reset Password"}
                </Button>
              </div>
              {isLoading && <LoadingSpinner />}
            </form>
            <div className="w-100 text-center mt-4 mb-1 text-blue-700">
              <Link to="/login">Login</Link>
            </div>
          </CardContent>
        </Card>
        <p className="text-center mt-4">
          Don't have an account?
          <Link to="/signup" className="text-blue-700">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
