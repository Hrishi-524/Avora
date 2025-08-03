import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { sendSignupData, redirectToHome } from '../api/user';
//css file
import './Signup.css'
//various icons for signup form
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signup() {
    //useNavigate from react router to redierct to home after login/signup
    const navigate = useNavigate();

    //STATE VARIABLES 
    //until user clicks on eye icon dont show password
    const [showPassword, setShowPassword] = useState(false);
    //onSubmit may take time to prevent multiple submits we use this state
    const [isLoading, setIsLoading] = useState(false);
    //if there is an error in submitting the form store in react state to show it on page
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            //extract formData from Form and store it in a object
            const formData = new FormData(e.target);
            const signupData = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
                isHost: false,
            }
            
            //in case user is trying to submit without providing username/email/passoword notify with error
            if (!signupData.username || !signupData.email || !signupData.password) {
                setError('Please fill in all fields');
                setIsLoading(false);
                return;
            }
            
            //finally send the data with sendSignupData 
            // POST : /api/signup
            const response = await sendSignupData(signupData);

            //get token from JWT response 
            const token = response.data.token;

            //redirect to the home page
            await redirectToHome(token, navigate);
        } catch (error) {
            //in any error cases handle error
            console.error('Signup error:', error);
            setError(error.response?.data?.error || 'Signup failed. Please try again.');
        } finally {
            //finally set loading to false
            setIsLoading(false);
        }
    }
    
    return (
        <div className='auth-container'>
            <div className='auth-background'>
                <div className='background-pattern'></div>
            </div>
            
            <div className='auth-content'>
                <div className='auth-card'>
                    <div className='auth-header'>
                        <h1>Create Account</h1>
                        <p className='auth-subtitle'>Start Your Journey With Wanderlust</p>
                    </div>
                    
                    {/**
                     * This is signup form (username, email, set passowrd) 
                     * if you alredy have an account it can redirect you to login page
                     */}
                    <form onSubmit={handleSubmit} className='auth-form'>
                        {error && <div className='error-message'>{error}</div>}
                        
                        <div className='input-group'>
                            <PersonIcon className='input-icon' />
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                placeholder="Username"
                                required
                                className='auth-input'
                            />
                        </div>
                        
                        <div className='input-group'>
                            <EmailIcon className='input-icon' />
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="Email address"
                                required
                                className='auth-input'
                            />
                        </div>
                        
                        <div className='input-group'>
                            <LockIcon className='input-icon' />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                placeholder="Password"
                                required
                                className='auth-input'
                            />
                            <button 
                                type="button" 
                                className='password-toggle'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>
                        
                        <button 
                            type='submit' 
                            className={`auth-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    
                    <div className='auth-footer'>
                        <p>Already have an account? 
                            <Link to='/login' className='auth-link'>Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

