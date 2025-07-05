import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import './Card.css'
import { NavLink, Link } from "react-router-dom";

export default function Card({listing}) {
    return (
        <MUICard className='mui-card-div'>
            <Link to={`/listings/${listing._id}`} style={{textDecoration:'none', color:'inherit'}}>
                <CardActionArea>
                    <CardMedia component="img" height="200" image={listing.images[0].url} alt={`${listing.title} image`}
                        sx={{ borderRadius:'12px'}}
                    />
                        <CardContent>
                        <Typography gutterBottom component="div" sx={{font : 'var(--h5)'}}>
                            {listing.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                            {listing.description}
                        </Typography>
                        </CardContent>
                </CardActionArea>
            </Link>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between', paddingTop:'0',}}>
                <Button variant="plain" sx={{font:'var(--p2)', lineHeight:'1.4em', color:'var(--text)'}}>Book now for ₹{listing.price}</Button>
                <Link to={`/listings/${listing._id}`} style={{textDecoration:'none', color:'inherit'}}>
                    <Button endDecorator={<KeyboardArrowRight />} color="success" sx={{font:'var(--p2)'}}>
                        Explore More
                    </Button>
                </Link>
            </CardActions>
        </MUICard>  
    )
}

