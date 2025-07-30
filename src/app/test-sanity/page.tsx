"use client";
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

export default function TestSanityPage() {
  const [status, setStatus] = useState<string>('Testing Sanity connection...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function testSanity() {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
      const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
      
      setStatus(`Testing with projectId: ${projectId}, dataset: ${dataset}`);
      
      // Test direct API call
      const query = encodeURIComponent('*[_type == "photo"][0..2]');
      const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
      
      try {
        console.log('Attempting to fetch from:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
        }
        
        const data = JSON.parse(responseText);
        setData(data);
        setStatus('Successfully connected to Sanity!');
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError({
          message: err.message,
          stack: err.stack,
          name: err.name,
          url: url
        });
        setStatus('Failed to connect to Sanity');
      }
    }
    
    testSanity();
  }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Sanity Connection Test
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Status: {status}
        </Typography>
        
        {error && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
            <Typography variant="subtitle2">Error Details:</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              Message: {error.message}
              {'\n\n'}
              URL: {error.url}
              {'\n\n'}
              Stack: {error.stack}
            </Typography>
          </Box>
        )}
        
        {data && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography variant="subtitle2">Response:</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(data, null, 2)}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}