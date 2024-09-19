"use client"

/**
 * Interface for user data passed to the userLogin function
 * 
 * @property {string} username - Username of the user
 * @property {string} password - Password of the user
 */
export interface UserData {
    username: string;
    password: string;
}

/**
 * URL for the login API endpoint
 */
const url = "/api/login"; 

/**
 * Function to log in a user
 * 
 * @param {UserData} userData - User data to log in
 * @returns {Promise<any>} - Promise that resolves with the response data from the API
 */
export const userLogin = async (userData: UserData) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        // Check if the response is okay
        if (!response.ok) {
            const text = await response.text();
            console.error("Full response from server:", text);

            if (response.status >= 500) {
                throw new Error("We are experiencing technical difficulties. Please try again later.");
            } else if (response.status === 400) {
                throw new Error('Invalid credentials. Please try again.');
            } else {
                throw new Error("Something went wrong. Please try again.");
            }
        }

        // Parse the response and return data
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error during login:", error);
        throw new Error((error as Error).message);
    }
};
export default userLogin
