import * as React from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getUserInfo, isAuthenticated, removeToken } from '../../utils/auth';
import { Menu, X, MapPin } from 'lucide-react';
import { Box, Typography, Avatar } from '@mui/material';
import './Navbar.css';

const pages = [];
const links = [];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const navigate = useNavigate();

    // Scroll detection
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50); // Show background after scrolling 50px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        removeToken();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const navigateToHostForm = () => {
        navigate('/host');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navigateToUserProfile = () => {
        const id = getUserInfo().id;
        navigate(`/user/${id}`);
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Left Section - Logo + Nav Links */}
                <div className="navbar-left">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
    <Box className="logo-container">
        <Avatar 
            className="logo-avatar"
            sx={{
                width: 42,
                height: 42,
                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                transform: 'rotate(-1deg)',
                transition: 'all 0.3s ease',
                boxShadow: '0 3px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                '&:hover': {
                    transform: 'rotate(1deg) scale(1.05)',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }
            }}
        >
            <Box className="path-icon">
                <Box className="path-line path-1" />
                <Box className="path-line path-2" />
                <Box className="path-dot" />
            </Box>
        </Avatar>
        
        <Box className="logo-text">
            <Typography className="brand-name" variant="h5" component="span">
                Avora
            </Typography>
            <Typography className="brand-tagline" variant="caption" component="span">
                the way you go
            </Typography>
        </Box>
    </Box>
</Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-menu">
                        {pages.map((page, index) => (
                            <Link 
                                key={page}
                                to={links[index]} 
                                className="nav-link"
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Section - Auth Buttons */}
                <div className="navbar-right">
                    <div className="navbar-auth">
                        {isAuthenticated() && (
                            <button
                                onClick={navigateToUserProfile}
                                className='host-btn'
                            >
                                your profile
                            </button>
                        )}
                        {isAuthenticated() && (
                            <button 
                                onClick={navigateToHostForm}
                                className="host-btn"
                            >
                                Host a listing
                            </button>
                        )}
                        
                        {isAuthenticated() ? (
                            <button 
                                onClick={handleLogout}
                                className="auth-btn logout-btn"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="auth-btn login-btn">
                                    Log In
                                </Link>
                                <Link to="/signup" className="auth-btn signup-btn">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="mobile-toggle"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-links">
                    {pages.map((page, index) => (
                        <Link 
                            key={page}
                            to={links[index]} 
                            className="mobile-link"
                            onClick={closeMobileMenu}
                        >
                            {page}
                        </Link>
                    ))}
                </div>
                
                <div className="mobile-auth">
                    {isAuthenticated() && (
                        <button 
                            onClick={() => {
                                navigateToHostForm();
                                closeMobileMenu();
                            }}
                            className="host-btn mobile"
                        >
                            Host a Listing
                        </button>
                    )}
                    
                    {isAuthenticated() ? (
                        <button 
                            onClick={() => {
                                handleLogout();
                                closeMobileMenu();
                            }}
                            className="auth-btn logout-btn mobile"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="auth-btn login-btn mobile"
                                onClick={closeMobileMenu}
                            >
                                Log In
                            </Link>
                            <Link 
                                to="/signup" 
                                className="auth-btn signup-btn mobile"
                                onClick={closeMobileMenu}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}