import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from '../utils/auth';
import axios from 'axios';
import { editListing, fetchListingById } from '../api/listings';

export default function Edit() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        propertyTitle: "",
        propertyType: "",
        address: "",
        city: "",
        state: "",
        country: "",
        price: "",
        phone: "",
        description: "",
        amenities: []
    });
    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
    const loadListing = async () => {
        try {
            const data  = await fetchListingById(params.id);
            if (data) {
                const listing = data;
                setFormData({
                    propertyTitle: listing.title || "",
                    propertyType: listing.type || "",
                    address: listing.address || "",
                    city: listing.location?.split(",")[0] || "",
                    state: listing.location?.split(",")[1] || "",
                    country: listing.country || "",
                    price: listing.price || "",
                    phone: listing.hostContact || "",
                    description: listing.description || "",
                    amenities: listing.amenities || []
                });
                setImages(listing.images || []);
            }
            console.log(data)
        } catch (err) {
            console.error("Error loading listing:", err);
            setError("Failed to load listing.");
        }
    };

    if (params.id) loadListing();
}, [params.id]);


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                amenities: checked 
                    ? [...prev.amenities, value]
                    : prev.amenities.filter(item => item !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        console.log(e)
        
        try {

            if (!formData.propertyTitle ||!formData.address ||!formData.price ||!formData.phone) {
                setError('Please fill in all required fields');
                setIsLoading(false);
                return;
            }
            
            const editedListing = {
                title: formData.propertyTitle,
                type: formData.propertyType,
                address: formData.address,
                description: formData.description,
                hostContact: formData.phone,
                amenities: formData.amenities, // already an array in your state
                price: formData.price,
                location: `${formData.city || ''}, ${formData.state || ''}`,
                country: formData.country,
                host: getUserInfo().username,
                images : images,
            };

            console.log('newListing created by frontend', editedListing)
            const response = await editListing(params.id, editedListing);
            if (response.error) {
                throw new Error(response.error);
            } else {
                setSuccess(true);
            }
        } catch (error) {
            console.error('Host registration error:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    if (success) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    maxWidth: '400px'
                }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem', margin: '0 0 1rem 0' }}>
                        Editing Request Sent
                    </h2>
                    <p style={{ marginBottom: '1rem', margin: '0 0 1rem 0' }}>
                        Your application has been submitted successfully.
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: '0.8', margin: 0 }}>
                        Our team will review it within 24-48 hours.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                        <button 
                            onClick={() => navigate('/')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                opacity: '0.9',
                                padding: '0.5rem 0'
                            }}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form  onSubmit={(e) => handleSubmit(e)}>
        <div style={{
            fontFamily: 'var(--ff)',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, var(--auth-gradient-start) 0%,  var(--auth-gradient-end) 100%)',
            padding: '2rem 1rem'
        }}>
            {/* Back button */}
            <div style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                <button 
                    onClick={() => navigate('/')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        opacity: '0.9',
                        padding: '0.5rem 0'
                    }}
                >
                    ← Back to Home
                </button>
            </div>

            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>
                        Host a listing
                    </h1>
                    <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>
                        Share your space and earn extra income
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: '#fee',
                        border: '1px solid #fcc',
                        color: '#c33',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                {/* Property Title */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Property Title *
                    </label>
                    <input
                        type="text"
                        name="propertyTitle"
                        value={formData.propertyTitle}
                        onChange={handleInputChange}
                        placeholder="e.g., Cozy Downtown Apartment"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                </div>

                {/* Property Type */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Property Type *
                    </label>
                    <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box',
                            background: 'white'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    >
                        <option value="">Select property type</option>
                        <option value="villa">Villa</option>
                        <option value="hotel">Hotel</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="resort">Resort</option>
                    </select>
                </div>

                {/* Address */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Address *
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Full address of your property"
                        required
                        rows="3"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                </div>

                {/* City and State */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                            City *
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                            State / Province / Teritorry
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="State"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="State"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                </div>

                {/* Price and Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                            Price per Night *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="₹2000"
                            required
                            min="1"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                            Contact Phone *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                </div>

                {/* Amenities */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Amenities
                    </label>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                        gap: '0.5rem',
                        padding: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        background: '#f9f9f9'
                    }}>
                        {['WiFi', 'AC', 'Kitchen', 'Parking', 'Pool', 'Gym'].map(amenity => (
                            <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    value={amenity.toLowerCase()}
                                    checked={formData.amenities.includes(amenity.toLowerCase())}
                                    onChange={handleInputChange}
                                    style={{ margin: 0 }}
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Upload Images
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setImages(Array.from(e.target.files))}
                    />
                    {images.length > 0 && (
                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {images.map((file, idx) => (
                            <span key={idx} style={{ fontSize: '0.8rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>
                            {file.name}
                            </span>
                        ))}
                        </div>
                    )}
                </div>


                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your property, highlight what makes it special..."
                        required
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        background: isLoading ? '#ccc' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.3s ease',
                        marginBottom: '1rem'
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) e.target.style.background = '#218838';
                    }}
                    onMouseLeave={(e) => {
                        if (!isLoading) e.target.style.background = '#28a745';
                    }}
                >
                    {isLoading ? 'Submitting Application...' : 'Submit Application'}
                </button>

                {/* Info note */}
                <div style={{
                    padding: '1rem',
                    background: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    color: '#666',
                    lineHeight: '1.4'
                }}>
                    <strong>Note:</strong> After submitting, our team will review your application within 24-48 hours. 
                    You'll receive an email confirmation once approved.
                </div>
            </div>
        </div>
        </form>
    );
}