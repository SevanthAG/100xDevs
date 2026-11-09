import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { BACKEND_URL } from "@/config";

export interface AuthRightProps {
  mode?: "signup" | "signin";
  title?: string;
  description?: string;
  buttonText?: string;
}

export function AuthRight({
  mode = "signup",
  title,
  description,
  buttonText,
}: AuthRightProps) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const isSignUp = mode === "signup";
  const displayTitle = title ?? (isSignUp ? "Create an account" : "Welcome back");
  const displayDescription =
    description ??
    (isSignUp
      ? "Enter your email or username and choose a password."
      : "Enter your email or username and password to continue.");
  const displayButtonText = buttonText ?? (isSignUp ? "Sign Up" : "Sign In");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${BACKEND_URL}/api/auth/signup`,{
      identifier,
      password
    })
  };

  return (
    <div className="w-full max-w-md">
      <Card className="w-full shadow-lg border-border/80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{displayTitle}</CardTitle>
          <CardDescription>{displayDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="name@example.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer mt-2">
              {displayButtonText}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/40 pt-4">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="font-medium text-foreground underline-offset-4 hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-medium text-foreground underline-offset-4 hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
