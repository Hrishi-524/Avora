import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { sendSignupData, redirectToHome } from '../api/user';
import './Signup.css'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const formData = new FormData(e.target);
            const signupData = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
                isHost: false,
            }
            
            if (!signupData.username || !signupData.email || !signupData.password) {
                setError('Please fill in all fields');
                setIsLoading(false);
                return;
            }
            
            const response = await sendSignupData(signupData);
            const token = response.data.token;
            await redirectToHome(token, navigate);
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.response?.data?.error || 'Signup failed. Please try again.');
        } finally {
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
                        <div className='logo'>
                            <MapOutlinedIcon className='logo-icon' />
                            <h2>Wanderlust</h2>
                        </div>
                        <h1>Create Account</h1>
                        <p className='auth-subtitle'>Start your journey with us today</p>
                    </div>
                    
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

