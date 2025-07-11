import React from 'react';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

export default function ImageCarousel({ listing }) {
  if (!listing || !listing.images || listing.images.length === 0) {
    return null;
  }

  // Separate featured and regular images
  const featuredImages = listing.images.filter(image => image.featured);
  const regularImages = listing.images.filter(image => !image.featured);
  const allImages = [...featuredImages, ...regularImages];
  const totalImages = allImages.length;

  const handleViewAllImages = () => {
    // TODO: Implement view all images functionality
    console.log('View all images clicked');
  };

  const renderSingleImage = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: '0',
        padding: 0,
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          width: '100%',
          height: '400px',
        }}
      >
        <CardMedia
          component="img"
          image={allImages[0].url}
          alt="Listing image"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Card>
    </Box>
  );

  const renderTwoImages = () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
        width: '100%',
        maxWidth: '1200px',
        margin: '0',
        padding: 0,
      }}
    >
      {allImages.slice(0, 2).map((image, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            height: '400px',
          }}
        >
          <CardMedia
            component="img"
            image={image.url}
            alt={`Listing image ${index + 1}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Card>
      ))}
    </Box>
  );

  const renderThreeImages = () => {
    // If we have a featured image, use it as the large image
    const largeImage = featuredImages.length > 0 ? featuredImages[0] : allImages[0];
    const smallImages = featuredImages.length > 0 ? regularImages.slice(0, 2) : allImages.slice(1, 3);
    
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0',
            padding: 0,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 2,
            height: '420px',
          }}
        >
          {/* Large image - takes up 2 rows */}
          <Card
            sx={{
              gridColumn: '1',
              gridRow: '1 / 3',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              image={largeImage.url}
              alt="Featured listing image"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Card>

          {/* Small images - stack vertically */}
          {smallImages.map((image, index) => (
            <Card
              key={index}
              sx={{
                gridColumn: '2',
                gridRow: index + 1,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2,
              }}
            >
              <CardMedia
                component="img"
                image={image.url}
                alt={`Listing image ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Card>
          ))}
        </Box>
      </Box>
    );
  };

  const renderMultipleImages = () => (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0',
        padding: 0,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 200px)',
          gap: 2,
          height: '420px',
        }}
      >
        {/* Featured image - takes up 2x2 grid */}
        {featuredImages.length > 0 && (
          <Card
            sx={{
              gridColumn: 'span 2',
              gridRow: 'span 2',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              image={featuredImages[0].url}
              alt="Featured listing image"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Card>
        )}

        {/* Regular images - fill remaining grid cells */}
        {regularImages.slice(0, 4).map((image, index) => (
          <Card
            key={index}
            sx={{
              gridColumn: 'span 1',
              gridRow: 'span 1',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 2,
              position: 'relative',
            }}
          >
            <CardMedia
              component="img"
              image={image.url}
              alt={`Listing image ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Show "View All" button on the last visible image */}
            {index === 3 && totalImages > 4 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
              >
                <IconButton
                  onClick={handleViewAllImages}
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                  }}
                >
                  <MoreHoriz />
                </IconButton>
              </Box>
            )}
          </Card>
        ))}
      </Box>
      
      {/* View All Images Button - positioned at bottom right corner */}
      {totalImages > 4 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={handleViewAllImages}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            <MoreHoriz />
            <Typography variant="caption" sx={{ ml: 1 }}>
              +{totalImages - 4} more
            </Typography>
          </IconButton>
        </Box>
      )}
    </Box>
  );

  // Conditional rendering based on image count
  if (totalImages === 1) {
    return renderSingleImage();
  } else if (totalImages === 2) {
    return renderTwoImages();
  } else if (totalImages === 3) {
    return renderThreeImages();
  } else {
    return renderMultipleImages();
  }
};
