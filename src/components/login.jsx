import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
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
import { login } from '@/service/authService'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { signInWithGoogle } from '@/service/authService'



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log("email: ", email);
    //     console.log("pass: ", password);
    // }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await login(email, password);
        console.log(resp)
        localStorage.setItem("user", resp.user.displayName)
        localStorage.setItem("email", resp.user.email)
        localStorage.setItem("userId", resp.user.uid)
        localStorage.setItem("isAuthenticated", resp.user.emailVerified)
        console.log(localStorage.getItem("isAuthenticated"))
        if(localStorage.getItem("isAuthenticated") == 'true'){
            navigate('/dashboard')
        }
        else{
            alert('something went wrong! try again')
        }
    }


    const handleSigninWithGoogle = async () => {
        const resp = await signInWithGoogle();
        console.log(resp)
        localStorage.setItem("user", resp.user.displayName)
        localStorage.setItem("email", resp.user.email)
        localStorage.setItem("userId", resp.user.uid)
        localStorage.setItem("isAuthenticated", resp.user.emailVerified)
        console.log(localStorage.getItem("isAuthenticated"))
        if(localStorage.getItem("isAuthenticated") == 'true'){
            navigate('/dashboard')
        }
        else{
            alert('something went wrong! try again')
        }
    }


    const handleClick = async () => {
        navigate('/signup')
    }
    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardAction>
                        <Button variant="link" onClick={handleClick}>Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
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
                        Login
                    </Button>
                    <Button onClick={handleSigninWithGoogle} variant="outline" className="w-full">
                        <FcGoogle /> Sign in with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login