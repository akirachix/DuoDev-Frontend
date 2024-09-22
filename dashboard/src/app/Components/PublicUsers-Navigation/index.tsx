"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For getting current route

export default function PublicUsersNavigation() {
  const pathname = usePathname(); // Get the current route

return (
    <nav className="bg-artisticblue py-3 text-white flex justify-between w-full">
        <section className="lg:pl-8">
        <Link href={"/landingpage"}>
            <Image
                src={"/logo.png"}
                alt="Eco-Threads logo"
                width={150}
                height={100}
            />
        </Link>
        </section>

        <section className="flex lg:ml-[60%] ml-[15%] md:ml-[50%] lg:px-5 ">
        <ul className="flex lg:gap-20 gap-8 items-center">
            <Link href={"/publicUser/home"}>
            <li
                className={` text-[16px] cursor-pointer ${
                pathname === "/publicUser/home"
                ? "text-forestgreen font-bold"
                : "hover:text-forestgreen"
                }`}
            >
            Home
            </li>
            </Link>

            <Link href={"/publicUser/marketplace"}>
            <li
                className={` text-[16px] cursor-pointer ${
                pathname === "/publicUser/marketplace"
                ? "text-forestgreen font-bold"
                : "hover:text-forestgreen"
                }`}
            >
            Marketplace
            </li>
        </Link>
        </ul>
    </section>

    <div></div>
    </nav>
);
}
