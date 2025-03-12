"use client";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";

const Logout = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_token");
    }
    setUser(null);
    router.replace("/login");
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md">
        <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
        <h2 className="text-2xl">You have been logged out</h2>
        <Button onClick={handleLogout}>Go to Login</Button>
      </div>
    </div>
  );
};

export default Logout;
