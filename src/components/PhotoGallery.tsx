import { Box, ImageList, ImageListItem, ImageListItemBar, Chip } from '@mui/material';
import { useState } from 'react';
import { Photo } from '@/types/photo';

interface PhotoGalleryProps {
  photos: Photo[];
  onLocationClick: (location: string | null) => void;
  selectedLocation: string | null;
}

export default function PhotoGallery({ photos, onLocationClick, selectedLocation }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <Box sx={{ flex: 1, overflow: 'auto' }}>
      {/* Location filter chips */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label="All"
          onClick={() => onLocationClick(null)}
          color={selectedLocation === null ? 'primary' : 'default'}
          sx={{ fontFamily: 'var(--font-ibm-plex-mono), monospace' }}
        />
        {Array.from(new Set(photos.map(p => p.location.name))).map(location => (
          <Chip
            key={location}
            label={location}
            onClick={() => onLocationClick(location)}
            color={selectedLocation === location ? 'primary' : 'default'}
            sx={{ fontFamily: 'var(--font-ibm-plex-mono), monospace' }}
          />
        ))}
      </Box>

      {/* Photo grid */}
      <ImageList 
        cols={3} 
        gap={16}
        sx={{
          overflow: 'auto',
          height: 'calc(100vh - 300px)',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#555',
            },
          },
        }}
      >
        {photos.map((photo) => (
          <ImageListItem 
            key={photo.id}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.thumbnail}
              alt={photo.caption || photo.location.name}
              loading="lazy"
              style={{ 
                height: '200px', 
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <ImageListItemBar
              title={photo.location.name}
              subtitle={photo.date}
              sx={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                borderRadius: '0 0 8px 8px',
                '& .MuiImageListItemBar-title': {
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '0.9rem',
                },
                '& .MuiImageListItemBar-subtitle': {
                  fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  fontSize: '0.8rem',
                },
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Photo lightbox/modal can be added here */}
    </Box>
  );
}