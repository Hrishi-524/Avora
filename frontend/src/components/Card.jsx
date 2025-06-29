import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

export default function Card({listing}) {
    return (
        <MUICard sx={{
                width:'100%', 
                height:'auto', 
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                borderTop: '2px solid hsl(0 0% 40%)',
                borderLeft: '2px solid hsl(0 0% 40%)',
                borderBottom: '4px solid hsl(0 0% 10%)',
                borderRight: '4px solid hsl(0 0% 10%)',
                borderRadius: '12px',
                boxSizing: 'border-box',
                padding: '0.5rem',
            }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={listing.image.url}
                    alt={`${listing.title} image`}
                    sx={{
                        border: '1px solid hsl(0 0% 10%)',
                        borderRadius:'12px'
                    }}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {listing.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {listing.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    paddingX: 2,
    paddingBottom: 2,
  }}
>
  {/* Left Button: Highlighted Text Button */}
  <Button
    variant="text"
    sx={{
      color: 'var(--warning)',
      fontWeight: 'bold',
      textTransform: 'none',
      fontSize: '1rem',
      '&:hover': {
        color: 'var(--warning)',
        backgroundColor: 'hsl(52 100% 20%)',
        boxShadow: '0 0 8px var(--warning)',
      },
    }}
  >
    Book Now for ₹{listing.price}
  </Button>

  {/* Right Button: Solid Primary Button */}
  <Button
    variant="contained"
    sx={{
      backgroundColor: 'var(--primary)',
      color: 'white',
      fontWeight: 500,
      textTransform: 'none',
      borderRadius: '8px',
      paddingX: 2,
      '&:hover': {
        backgroundColor: 'hsl(345 80% 45%)',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
      },
    }}
  >
    Explore More
  </Button>
</CardActions>

        </MUICard>
    )
}