import React from 'react'
import { verifyLoginData, redirectToHome } from '../api/user';

export default function Login() {
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const loginData = {
                username : e.target[0].value,
                password : e.target[1].value,
            }
            console.log("handleSubmit() at Login.jsx")
            console.log(loginData);

            const response = await verifyLoginData(loginData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log("This is the token saved in localStorage");
            console.log(localStorage.getItem('token'));
            await redirectToHome(token);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    }
    return (
        <div className='login-div'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">Set Password</label>
                <input type="password" name="password" id="passsword" />  
                <button type='submit'>Submit</button> 
            </form>
        </div>
    )
}
