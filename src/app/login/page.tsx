"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function LoginPage(){

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("login successfull", response.data);
            toast.success("Login Successfull");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col justify-center items-center p-8 text-2xl font-bold min-h-screen text-slate-800 space-y-12 font-sans ">
        <h1 className="font-mono">{loading ? "Loading" : "Login"}</h1>
        <div className="flex flex-col justify-center items-center text-lg text-slate-700 space-y-8 bg-gradient-to-r from-rose-100 to-teal-100 p-8 rounded-md border-2 border-slate-800">
            <div>
                <label htmlFor="email" className="mx-9">Email</label>
                <input type="email" id="email" value={user.email} onChange={(e)=> setUser({...user, email:e.target.value})} placeholder="Email" className="ring-slate-400 ring-2 focus:outline-none p-2 shadow-md"/>
            </div>
            <div>
                <label htmlFor="password" className="mx-4">Password</label>
                <input type="password" id="password" value={user.password} onChange={(e)=> setUser({...user, password:e.target.value})} placeholder="Password" className="ring-slate-400 ring-2 focus:outline-none p-2 shadow-md"/>
            </div>
            <div>
                <button type="submit" onClick={onLogin} className="border-2 border-slate-800 text-slate-800 p-2 hover:bg-slate-800 hover:text-slate-100 rounded-md">{buttonDisabled ? "No Login" : "Login"}</button>
            </div>
            <div>
                <Link href="/signup" className="text-indigo-700 hover:underline">Get to Sign Up page</Link>
            </div>
        </div>
    </div>
    )
}