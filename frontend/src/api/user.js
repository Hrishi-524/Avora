import axios from 'axios'
import { fetchListings } from './listings';
import { setToken } from '../utils/auth';

export const sendSignupData = async (signupData) => {
    //POST : /api/signup
    const response = await axios.post("/signup", signupData);
    return response; // Return full response
}

export const verifyLoginData = async (loginData) => {
    //POST : /api/login
    const response = await axios.post("/login", loginData);
    return response;
}

export const redirectToHome = async (token, navigate) => {
    // Use the auth utility to set token
    if (token) {
        setToken(token);
    }
    fetchListings();
    // Navigate to home page
    if (navigate) {
        navigate('/');
    }
}

export const fetchUserProfile = async (id) => {
    try {
        const token = localStorage.getItem("token"); 
        console.log('axios/user checkpoint')
        const response = await axios.get(`/user/${id}`,{
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log('error in fetching user', error)
        throw error;
    }
}