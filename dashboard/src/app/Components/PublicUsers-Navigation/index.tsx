import React from "react";
import Image from "next/image";
export default function PublicUsersNavigation() {
    return (
            <nav className="bg-artisticblue py-3 text-white flex justify-between w-full ">
                <section className="lg:pl-3  ">
                    <Image
                        src={"/logo.png"}
                        alt="Eco-Threads logo"
                        width={200}
                        height={100}
                        />
                </section>
                <section className=" flex lg:ml-[50%] md:ml-[20%] lg:px-5">
                    <ul className="flex lg:gap-20 gap-5 items-center ">
                        <li>Home</li>
                        <li>Marketplace</li>
                    </ul>
                </section>
                <div>

                </div>
            </nav>
    );
}