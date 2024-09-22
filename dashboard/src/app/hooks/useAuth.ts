import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { UserData } from '../utils/auth';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userData = getCookie('userData'); // Fetch user data from cookies
        if (userData) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (userData:UserData) => {
        setCookie('userData', userData); // Store user data in cookies
        setIsAuthenticated(true);
        router.push('/'); // Redirect after login
    };

    const logout = () => {
        deleteCookie('userData'); // Remove user data from cookies
        setIsAuthenticated(false);
        router.push('/login'); // Redirect after logout
    };

    return { isAuthenticated, login, logout };
};
