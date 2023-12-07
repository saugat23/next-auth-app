"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage(){

    const router = useRouter();
    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successfully");
            router.push("/login");
        } catch (error:any) {
            toast.error("Logout failed", error);
            console.log(error.message);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-2 space-y-4">
            <h1>Profile Page</h1>
            <button onClick={onLogout} className="bg-blue-600 rounded-lg text-slate-200 p-2">Logout</button>
        </div>
    )
}