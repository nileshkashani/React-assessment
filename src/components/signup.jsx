import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithGoogle, signup } from '@/service/authService'
import { Button } from './ui/button'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(auth.app.options.projectId)
    await signup(email, password, name);
    navigate("/dashboard");
  }



  const handleSignupWithGoogle = async() => {
    await signInWithGoogle();
    navigate('/dashboard')
  }


  const handleClick = async () => {
    navigate('/login')
  }
  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup to your account</CardTitle>
          <CardAction>
            <Button variant="link" onClick={handleClick}>login</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  required
                  onChange={(e) => { setName(e.target.value) }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required onChange={(e) => { setPassword(e.target.value) }} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} className="w-full bg-blue-400 hover:bg-blue-600">
            Sign Up
          </Button>
          <Button onClick={handleSignupWithGoogle} variant="outline" className="w-full">
            <FcGoogle/> Sign up with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup