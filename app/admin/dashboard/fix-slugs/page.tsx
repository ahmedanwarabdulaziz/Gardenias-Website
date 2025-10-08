'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Alert, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { CheckCircle, XCircle } from 'phosphor-react';
import { ServiceService } from '@/lib/serviceService';

export default function FixSlugsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ name: string; slug: string; success: boolean }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const fixAllSlugs = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setCompleted(false);

    try {
      // Fetch all services
      const services = await ServiceService.getServices();
      console.log(`Found ${services.length} services`);

      const updateResults: { name: string; slug: string; success: boolean }[] = [];

      // Update each service
      for (const service of services) {
        const newSlug = generateSlug(service.name);
        
        try {
          // Update the service with the new slug
          await ServiceService.updateService(service.id, {
            slug: newSlug,
          });
          
          updateResults.push({
            name: service.name,
            slug: newSlug,
            success: true,
          });
          
          console.log(`✓ Updated "${service.name}" with slug: "${newSlug}"`);
        } catch (err) {
          updateResults.push({
            name: service.name,
            slug: newSlug,
            success: false,
          });
          console.error(`✗ Failed to update "${service.name}":`, err);
        }
      }

      setResults(updateResults);
      setCompleted(true);
      
    } catch (err) {
      console.error('Error fixing slugs:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: '#008d80',
            mb: 2,
          }}
        >
          Fix Service Slugs
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Source Sans Pro", sans-serif',
            color: '#666',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          This utility will automatically generate and update slugs for all services in the database.
          Slugs are URL-friendly versions of service names used in the website URLs.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {completed && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Successfully updated {results.filter(r => r.success).length} service(s)!
          </Alert>
        )}

        {!loading && results.length === 0 && (
          <Button
            variant="contained"
            onClick={fixAllSlugs}
            sx={{
              bgcolor: '#008d80',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: '"Source Sans Pro", sans-serif',
              '&:hover': {
                bgcolor: '#007067',
              },
            }}
          >
            Fix All Service Slugs
          </Button>
        )}

        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 4 }}>
            <CircularProgress size={24} sx={{ color: '#008d80' }} />
            <Typography sx={{ fontFamily: '"Source Sans Pro", sans-serif', color: '#666' }}>
              Updating services...
            </Typography>
          </Box>
        )}

        {results.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Source Sans Pro", sans-serif',
                fontWeight: 700,
                mb: 2,
                color: '#333',
              }}
            >
              Update Results
            </Typography>
            <List>
              {results.map((result, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: result.success ? '#f0fdf4' : '#fef2f2',
                    borderRadius: 2,
                    mb: 1,
                    border: result.success ? '1px solid #bbf7d0' : '1px solid #fecaca',
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    {result.success ? (
                      <CheckCircle size={24} weight="fill" color="#22c55e" />
                    ) : (
                      <XCircle size={24} weight="fill" color="#ef4444" />
                    )}
                  </Box>
                  <ListItemText
                    primary={result.name}
                    secondary={`Slug: ${result.slug}`}
                    primaryTypographyProps={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontWeight: 600,
                    }}
                    secondaryTypographyProps={{
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '0.85rem',
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {completed && (
              <Button
                variant="outlined"
                onClick={() => {
                  setResults([]);
                  setCompleted(false);
                }}
                sx={{
                  mt: 3,
                  color: '#008d80',
                  borderColor: '#008d80',
                  '&:hover': {
                    borderColor: '#007067',
                    bgcolor: '#008d8010',
                  },
                }}
              >
                Run Again
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

