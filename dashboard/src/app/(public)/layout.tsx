import React from "react";
export default function PublicusersView ({ children }: {children: React.ReactNode}) {
    return(
        <div>
            <header><h1 className=""></h1></header>
            <main>
                {children}
            </main>
            <footer className=""><h1></h1></footer>
        </div>
    )
    
}