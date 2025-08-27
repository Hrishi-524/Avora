import Search from './Search'
import './Herosection.css'
import { useEffect, useState } from 'react';

export default function HeroSection({onSearchComplete}) {
    return (
        <div className="hero-section">
            <Search onSearchComplete={onSearchComplete}/>
        </div>
    )
}