"use client";

import { toast } from "sonner";
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import { useRouter } from "next/navigation";


function LogOutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const errorMessage = null;

        if (!errorMessage) {
            toast.success("Logged out successfully", {
                description: "You have been logged out."
            })

            router.push("/");
        } else {
            toast.error("Failed to log out", {
                description: errorMessage
            })
        }
        setLoading(false);
    };
    return (
        <Button
            className="w-24"
            variant="outline"
            onClick={handleLogout}
            disabled={loading}
        >{loading ? <Loader2 className="animate-spin" /> : "Logout"}</Button>
    );
}

export default LogOutButton