"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";



export default function Sidebar() {
  
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (section: string) => {
    setActiveLink(section);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-artisticblue w-47 h-full p-4 flex flex-col">
        <ul className="mt-5 space-y-6">

        <Image
        src="/logo.jpeg"
        width={230}
        height={200}
        alt="Eco-Threads logo"
        className="mt-[-2px]"
      />

          <li>
            <Link
              href="/recyclers"
              onClick={() => handleLinkClick("/recyclers")}
              className={`flex items-center p-2 text-white text-xl transition-all duration-300 hover:bg-forestgreen ${
                activeLink === "/recyclers" ? "text-forestgreen" : ""
              }`}
            >
              <span className="ml-3">Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard"
              onClick={() => handleLinkClick("/dashboard")}
              className={`flex items-center p-2 text-white text-xl transition-all duration-300 hover:bg-forestgreen ${
                activeLink === "/dashboard" ? "text-forestgreen" : ""
              }`}
            >
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/wastes"
              onClick={() => handleLinkClick("/wastes")}
              className={`flex items-center p-2 text-white text-xl transition-all duration-300 hover:bg-forestgreen ${
                activeLink === "/wastes" ? "text-forestgreen" : ""
              }`}
            >
              <span className="ml-3">Wastes</span>
            </Link>
          </li>

          <li>
            <Link
              href="/recyclers/footagent"
              onClick={() => handleLinkClick("/recyclers/footagent")}
              className={`flex items-center p-2 text-white text-xl transition-all duration-300 hover:bg-forestgreen ${
                activeLink === "/recyclers/footagent" ? "text-forestgreen" : ""
              }`}
            >
              <span className="ml-3">Agents</span>
            </Link>
          </li>

          <li>
            <Link
              href="/recyclers/orders"
              onClick={() => handleLinkClick("/recyclers/orders")}
              className={`flex items-center p-2 text-white text-xl transition-all duration-300  hover:bg-forestgreen ${
                activeLink === "/recyclers/orders" ? "text-forestgreen" : ""
              }`}
            >
              <span className="ml-3">Orders</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
