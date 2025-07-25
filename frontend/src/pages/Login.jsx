import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { verifyLoginData, redirectToHome } from '../api/user';
import './Login.css'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
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
            const loginData = {
                username: formData.get('username'),
                password: formData.get('password'),
            }
            
            if (!loginData.username || !loginData.password) {
                setError('Please fill in all fields');
                setIsLoading(false);
                return;
            }

            const response = await verifyLoginData(loginData);
            const token = response.data.token;
            await redirectToHome(token, navigate);
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
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
                        <h1>Welcome Back</h1>
                        <p className='auth-subtitle'>Sign in to continue your journey</p>
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
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    
                    <div className='auth-footer'>
                        <p>Don't have an account? 
                            <Link to='/signup' className='auth-link'>Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
