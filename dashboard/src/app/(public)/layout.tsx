import React from "react";
import PublicUsersNavigation from "../Components/PublicUsers-Navigation";
export default function PublicusersView ({ children }: {children: React.ReactNode}) {
    return(
        <div>
            <PublicUsersNavigation/>
            <main>
                {children}
            </main>
        </div>
    )
    
}