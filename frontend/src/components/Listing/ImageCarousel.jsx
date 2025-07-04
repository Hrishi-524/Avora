import './ImageCarousel.css'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImageCarousel({listing}) {
    return (
        <ImageList
			sx={{
				width: 500,
				height: 450,
				// Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
				transform: 'translateZ(0)',
			}}
			rowHeight={200}
			gap={1}
		>
			{listing.images.map((image) => {
				const cols = image.featured ? 2 : 1;
				const rows = image.featured ? 2 : 1;

				return (
					<ImageListItem key={image.url} cols={cols} rows={rows}>
						<img
						{...srcset(image.url, 250, 200, rows, cols)}
						alt={listing.title}
						loading="lazy"
					/>
						<ImageListItemBar
							sx={{
								background:
								'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
								'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
							}}
							title={listing.title}
							position="top"
							actionIcon={
								<IconButton
								sx={{ color: 'white' }}
								aria-label={`star ${listing.title}`}
								>
								<StarBorderIcon />
								</IconButton>
							}
							actionPosition="left"
						/>
					</ImageListItem>
				);
			})}
		</ImageList>
    )
}
