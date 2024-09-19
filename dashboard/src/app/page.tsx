'use client';  // This tells Next.js that the component should be a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router in the App Directory
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/landingpage");
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-artisticblue min-h-screen  text-white flex justify-center items-center ">
      <div className="text-center">
        <Image
          src="/logo.png"
          width={600}
          height={300}
          alt="home page"
        />
        <h1 className="mt-5 lg:text-[34px]  text-[20px]text-center">Loading into Eco Threads. . . . .</h1>
      </div>
    </div>
  );
}
