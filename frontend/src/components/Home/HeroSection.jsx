import Search from './Search'
import './Herosection.css'

export default function HeroSection({onSearchComplete}) {
    return (
        <div className="hero-section">
            <Search onSearchComplete={onSearchComplete}/>
        </div>
    )
}