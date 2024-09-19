import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function PublicUsersNavigation() {
    return (
            <nav className="bg-artisticblue py-3 text-white flex justify-between w-full ">
                <section className="lg:pl-3  ">
                    <Link href={"/landingpage"}>
                    <Image
                        src={"/logo.png"}
                        alt="Eco-Threads logo"
                        width={200}
                        height={100}
                        />
                    </Link>
                </section>
                <section className=" flex lg:ml-[50%] md:ml-[20%] lg:px-5">
                    <ul className="flex lg:gap-20 gap-5 items-center ">
                    <Link href={"/publicUser/home"}>
                        <li className="hover:text-forestgreen cursor-pointer">Home</li>
                    </Link>

                    <Link href={"/publicUser/marketplace"}>
                    <li className="hover:text-forestgreen cursor-pointer">Marketplace</li>
                    </Link>

                    </ul>
                </section>
                <div>

                </div>
            </nav>
    );
}