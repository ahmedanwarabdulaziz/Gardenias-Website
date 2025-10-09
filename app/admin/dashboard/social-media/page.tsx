'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  Chip,
} from '@mui/material';
import { Pencil } from 'phosphor-react';
import { SocialMediaService, SocialMedia } from '@/lib/socialMediaService';

const defaultSocialMediaPlatforms = [
  { platform: 'Facebook', name: 'Facebook' },
  { platform: 'Instagram', name: 'Instagram' },
  { platform: 'Twitter', name: 'Twitter' },
  { platform: 'LinkedIn', name: 'LinkedIn' },
  { platform: 'YouTube', name: 'YouTube' },
  { platform: 'TikTok', name: 'TikTok' },
];

export default function SocialMediaPage() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialMedia | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    isEnabled: false,
  });

  useEffect(() => {
    initializeSocialMedia();
  }, []);

  const initializeSocialMedia = async () => {
    setLoading(true);
    try {
      let data = await SocialMediaService.getAllSocialMedia();
      
      // If no social media exists, create all default platforms
      if (data.length === 0) {
        console.log('Creating default social media platforms...');
        for (let i = 0; i < defaultSocialMediaPlatforms.length; i++) {
          const platform = defaultSocialMediaPlatforms[i];
          try {
            await SocialMediaService.addSocialMedia({
              name: platform.name,
              platform: platform.platform as SocialMedia['platform'],
              url: '',
              isEnabled: false,
              displayOrder: i,
            });
          } catch (err) {
            console.error(`Error creating ${platform.name}:`, err);
          }
        }
        data = await SocialMediaService.getAllSocialMedia();
      } else {
        // Check if we need to add any missing platforms
        const existingPlatforms = data.map(d => d.platform);
        for (let i = 0; i < defaultSocialMediaPlatforms.length; i++) {
          const platform = defaultSocialMediaPlatforms[i];
          if (!existingPlatforms.includes(platform.platform as SocialMedia['platform'])) {
            try {
              await SocialMediaService.addSocialMedia({
                name: platform.name,
                platform: platform.platform as SocialMedia['platform'],
                url: '',
                isEnabled: false,
                displayOrder: i,
              });
            } catch (err) {
              console.error(`Error creating ${platform.name}:`, err);
            }
          }
        }
        data = await SocialMediaService.getAllSocialMedia();
      }
      
      // Remove duplicates by keeping only the first occurrence of each platform
      const uniqueData = data.reduce((acc, current) => {
        const exists = acc.find(item => item.platform === current.platform);
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, [] as SocialMedia[]);
      
      setSocialMedia(uniqueData);
    } catch (error) {
      console.error('Error initializing social media:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to load social media links: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item: SocialMedia) => {
    setEditingItem(item);
    setFormData({
      url: item.url,
      isEnabled: item.isEnabled,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      url: '',
      isEnabled: false,
    });
  };

  const handleSave = async () => {
    if (!editingItem) return;
    
    try {
      await SocialMediaService.updateSocialMedia(editingItem.id, formData);
      await initializeSocialMedia();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving social media:', error);
      alert('Failed to save social media link');
    }
  };

  const handleToggleEnabled = async (item: SocialMedia) => {
    try {
      await SocialMediaService.updateSocialMedia(item.id, {
        isEnabled: !item.isEnabled,
      });
      await initializeSocialMedia();
    } catch (error) {
      console.error('Error toggling social media:', error);
      alert('Failed to update social media link');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Social Media Links
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Manage your social media links and control their visibility on the website
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell><strong>Platform</strong></TableCell>
              <TableCell><strong>URL</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : socialMedia.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Initializing social media platforms...
                </TableCell>
              </TableRow>
            ) : (
              socialMedia.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={item.platform} 
                        size="small" 
                        sx={{
                          bgcolor: item.isEnabled ? '#008d8020' : '#e0e0e0',
                          color: item.isEnabled ? '#008d80' : '#666',
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.url ? (
                      <Typography
                        component="a"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: '#008d80',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                          maxWidth: '400px',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.url}
                      </Typography>
                    ) : (
                      <Typography sx={{ color: '#999', fontStyle: 'italic' }}>
                        Not configured
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch
                        checked={item.isEnabled}
                        onChange={() => handleToggleEnabled(item)}
                        color="success"
                        disabled={!item.url}
                      />
                      <Typography variant="caption" sx={{ color: item.isEnabled ? '#008d80' : '#999' }}>
                        {item.isEnabled ? 'Visible' : 'Hidden'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleOpenDialog(item)}
                      sx={{ color: '#008d80' }}
                    >
                      <Pencil size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit {editingItem?.platform} Link
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              label={`${editingItem?.platform} URL`}
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              fullWidth
              type="url"
              helperText="Enter the full URL including https://"
              placeholder={`https://${editingItem?.platform.toLowerCase()}.com/yourpage`}
            />

            <Box
              sx={{
                p: 3,
                bgcolor: '#f8faf9',
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: '#333',
                }}
              >
                Visibility Settings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontWeight: 500, color: '#333' }}>
                    Show on website
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Display this icon in the footer
                  </Typography>
                </Box>
                <Switch
                  checked={formData.isEnabled}
                  onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                  color="success"
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#666' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: '#008d80',
              '&:hover': { bgcolor: '#007067' },
              px: 3,
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
