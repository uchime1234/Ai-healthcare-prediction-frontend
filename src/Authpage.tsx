"use client"

import type React from "react"
import axios from 'axios'
import { useState } from "react"
import { Button } from "./components/button"
import { Input } from "./components/input"
import { Label } from "./components/label"
import { Card, CardContent, CardHeader, CardTitle } from "./components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs"

import { useNavigate } from "react-router-dom"

const REACT_APP_API_URL = "https://ai-healthcare-prediction-backend.onrender.com"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  
  const [username, setusername] = useState(""); //intializing the input data, that will hold the data
  const [password, setpassword] = useState("");

  

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const isLogin = form.closest("[data-tabs-content]")?.querySelector("[data-state=active]")?.getAttribute("value") === "login"
    const endpoint = isLogin ? `${REACT_APP_API_URL}/api/login/`: `${REACT_APP_API_URL}/api/register/`
    const body = isLogin
      ? {
          username: formData.get("username"),
          password: formData.get("password"),
        }
      : {
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include", // Include cookies for session authentication
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed")
      }

      // On successful authentication, navigate to dashboard
      setIsLoading(false)
      //localStorage.setItem("userEmail", data.email)
       //show the token
      navigate("/home")
    } catch (err) {
      setIsLoading(false)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }


  const handlesubmited = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/login/`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // Ensure session cookie is sent and received
          headers: {
            "Content-Type": "application/json",
            
          },
        }
      );
  
      console.log("Login response:", response.data);
  
      // Check if login was successful
      if (response.data.message === "Login successful") {
        // Store the email from the response in localStorage
        const email = response.data.email || "";
        if (!email) {
          throw new Error("Email not provided in login response");
        }
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", response.data.token);
    
  
        // Navigate to home immediately
        navigate("/home");
  
        // Optional: Set a success message (use a different state if needed)
        setError(""); // Clear any previous errors
        // If you have a success state, e.g., setSuccess, use it here
        // setSuccess("Logged in successfully");
      } else {
        throw new Error(response.data.error || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message || "An unexpected error occurred");
      }
    }
  };
 
  







  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-90"></div>
        <img src="/ai-landing-inspiration.png" alt="AI Healthcare" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Healthcare</h2>
            <p className="text-xl opacity-90">
              Revolutionizing medical predictions with advanced artificial intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">AI Body Predictor</h1>
            <p className="text-gray-600">Join the future of healthcare predictions</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-orange-600">Welcome Back</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlesubmited} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input id="login-username" name="username" type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Enter your username" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Enter your password" required />
                    </div>
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-orange-600">Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input id="register-username" name="username" type="text" placeholder="Choose a username" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" name="password" type="password" placeholder="Create a password" required />
                    </div>
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Register"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}