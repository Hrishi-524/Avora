import axios from 'axios'
import { fetchListings } from './listings';
import { setToken } from '../utils/auth';

export const sendSignupData = async (signupData) => {
    const response = await axios.post("/api/signup", signupData);
    return response; // Return full response
}

export const verifyLoginData = async (loginData) => {
    const response = await axios.post("/api/login", loginData);
    return response;
}

export const redirectToHome = async (token, navigate) => {
    // Use the auth utility to set token
    if (token) {
        setToken(token);
    }
    console.log("fetchlistings called")
    fetchListings();
    // Navigate to home page
    if (navigate) {
        navigate('/');
    }
}
