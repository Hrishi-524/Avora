import * as React from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getUserInfo, isAuthenticated, removeToken } from '../../utils/auth';
import { Menu, X, MapPin } from 'lucide-react';
import './Navbar.css';

const pages = ['villas', 'hotels', 'trips'];
const links = ['/listings', '/listings', '/listings'];

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
                        <div className="logo-container">
                            <div className="logo-icon">
                                <div className="compass-ring"></div>
                                <div className="compass-needle"></div>
                            </div>
                            <div className="logo-text">
                                <span className="brand-name">Wanderlust</span>
                                <span className="brand-tagline">the way you go</span>
                            </div>
                        </div>
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