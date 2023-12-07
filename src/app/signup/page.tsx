"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage(){

    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("signup successfull", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-8 text-2xl font-bold min-h-screen text-slate-800 space-y-12 font-sans ">
            <h1 className="font-mono">{loading ? "Loading" : "Sign Up"}</h1>
            <div className="flex flex-col justify-center items-center text-lg text-slate-700 space-y-8 bg-gradient-to-r from-rose-100 to-teal-100 p-8 rounded-md border-2 border-slate-800">
                <div>
                    <label htmlFor="username" className="mx-4">Username</label>
                    <input type="text" id="username" value={user.username} onChange={(e)=> setUser({...user, username:e.target.value})} placeholder="Username" className="ring-slate-400 ring-2 focus:outline-none p-2 shadow-md"/>
                </div>
                <div>
                    <label htmlFor="email" className="mx-9">Email</label>
                    <input type="email" id="email" value={user.email} onChange={(e)=> setUser({...user, email:e.target.value})} placeholder="Email" className="ring-slate-400 ring-2 focus:outline-none p-2 shadow-md"/>
                </div>
                <div>
                    <label htmlFor="password" className="mx-4">Password</label>
                    <input type="password" id="password" value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})} placeholder="Password" className="ring-slate-400 ring-2 focus:outline-none p-2 shadow-md"/>
                </div>
                <div>
                    <button type="submit" onClick={onSignup} className="border-2 border-slate-800 text-slate-800 p-2 hover:bg-slate-800 hover:text-slate-100 rounded-md" >{buttonDisabled ? "No sign up" : "Sign up"}</button>
                </div>
                <div>
                    <Link href="/login" className="text-indigo-700 hover:underline">Get to Login page</Link>
                </div>
            </div>
        </div>
    )
}