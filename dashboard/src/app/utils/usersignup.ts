export interface UserData {
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    set_password: string;
    password: string;
    role: string;
    }

    const url = "/api/register"; 
    export const userSignup = async (userData: UserData) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData), // Directly send the userData object
            });
    
            if (!response.ok) {
                const text = await response.text();
                console.error("Full response from server:", text);
    
                if (response.status >= 500) {
                    throw new Error(
                        "We are experiencing technical difficulties. Please try again later."
                    );
                } else if (response.status === 400) {
                    throw new Error('A user with this username already exists');
                } else {
                    throw new Error("Something went wrong. Please try again.");
                }
            }
    
            // Parse and return the response
            const data = await response.json();
    
            // Set the role in a cookie (if needed)
            if (data.role) {
                document.cookie = `userRole=${data.role}; path=/; max-age=${60 * 60 * 24 * 7}`; // Cookie expires in one week
            }
    
            return data;
        } catch (error) {
            console.error("Error during signup:", error);
            throw new Error((error as Error).message);
        }
    };