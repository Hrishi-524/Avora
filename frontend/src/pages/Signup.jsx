import React from 'react'
import { sendSignupData, redirectToHome } from '../api/user';

export default function Signup() {
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const signupData = {
                username : e.target[0].value,
                email : e.target[1].value,
                password : e.target[2].value,
                isHost : e.target[3].value,
            }
            console.log("handleSubmit() at Singup.jsx");
            console.log(signupData);
            const response = await sendSignupData(signupData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log("This is the token saved in localStorage");
            console.log(localStorage.getItem('token'));
            redirectToHome(localStorage.getItem('token'));
        } catch (error) {
            console.log('Error at Signup.jsx');
            console.log(error);
            throw error;
        }
    }
    return (
        <div className='sign-up-div'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Set Password</label>
                <input type="password" name="password" id="password" />
                <p>Do you want to be a host?</p>
                <label htmlFor="yes">
                <input type="radio" name="host" id="yes" value="true" />
                Yes
                </label>
                <label htmlFor="no">
                <input type="radio" name="host" id="no" value="false" />
                No
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

