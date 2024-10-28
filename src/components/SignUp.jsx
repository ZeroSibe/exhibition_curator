import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { signUp } from "@/auth";
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

export default function SignUp() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setIsLoading(true);
      await signUp(email, password);
      navigate("/my-profile");
    } catch {
      setError("Failed to create an account");
    }
    setIsLoading(false);
  };

  return (
    <div className="auth_container" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxHeight: "400px" }}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center mb-2">Sign Up</CardTitle>
            {error && <AlertDestructive msg={error} />}
            <CardDescription className="text-center mb-4">
              Signup to create your exhibition
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Password Confirmation</Label>
                  <Input
                    id="confirmPassword"
                    required
                    type="password"
                    placeholder="Retype your password"
                    aria-label="retype password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="centered_btn mt-4">
                <Button disabled={isLoading} className="w-100" type="submit">
                  {isLoading ? "Signing up..." : "Signup"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <p className="w-100 text-center mt-2">
          Already have an account?
          <Link to="/login" className="text-blue-700">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
