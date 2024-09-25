import React from "react";
import Image from "next/image";
export default function AuthLayout ({ children }: {children: React.ReactNode}) {
    return(
        <div>
            <header>
                
            <nav className="bg-artisticblue py-3 text-white flex justify-between w-full ">
                <section className="lg:pl-3  ">
                    <Image
                        src={"/logo.png"}
                        alt="Eco-Threads logo"
                        width={200}
                        height={100}
                        />
                </section>
                <div>

                </div>
            </nav>
            </header>
            <main>
                {children}
            </main>
            <footer className=""><h1></h1></footer>
        </div>
    )
    
}