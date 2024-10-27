"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();
  
  // console.log(path);
  return (
    <div className="flex justify-between p-4 bg-secondary shadow-md">
      <Image
        src="https://cdn-dkeek.nitrocdn.com/JJJmSmfNOVFIMRLxeOafUbjMfnGEpNvR/assets/static/optimized/rev-ccc93af/wp-content/uploads/2020/08/PurpleMockmate-01.png"
        width={160}
        height={100}
        alt="Logo"
      />
      <ul className=" gap-6 items-center text-xl font-medium hidden md:flex">
        <li
          className={`cursor-pointer hover:text-primary ${
            path === "/dashboard" && "text-primary"
          }`}
        >
          DashBoard
        </li>
        <li
          className={`cursor-pointer hover:text-primary ${
            path === "dashboard/question" && "text-primary"
          }`}
        >
          Question
        </li>
        <li
          className={`cursor-pointer hover:text-primary ${
            path === "dashboard/upgrade" && "text-primary"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`cursor-pointer hover:text-primary ${
            path === "dashboard/works" && "text-primary"
          }`}
        >
          How It Works
        </li>
      </ul>
      <div className="relative my-2">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox:
                "w-12 h-12 rounded-full border-2 border-primary", // customize avatar size
              userButtonTrigger: "transition hover:opacity-80", // add hover effects or transitions
            },
          }}
        />
      </div>
    </div>
  );
}

export default Header;
