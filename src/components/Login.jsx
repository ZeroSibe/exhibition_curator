import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "@/auth";
import { useAuth } from "@/contexts/AuthContext";

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

export default function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/my-profile");
    }
  }, [userLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError("Please fill in all fields");
    }
    try {
      setError("");
      setIsLoading(true);
      await signIn(email, password);
      navigate("/my-profile");
    } catch {
      setError("Failed to login. Please check your credentials and try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="auth_container" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxHeight: "400px" }}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center mb-2">Login</CardTitle>
            {error && <AlertDestructive msg={error} />}
            <CardDescription className="text-center mb-4">
              Login to view your exhibition
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    required
                    type="password"
                    placeholder="Enter your password"
                    aria-label="input password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="centered_btn mt-4">
                <Button disabled={isLoading} className="w-100" type="submit">
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            {isLoading && <LoadingSpinner />}
            <div className="w-100 text-center mt-4 mb-1 text-blue-700">
              <Link to="/forgot-password">Forgot Password?</Link>
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
