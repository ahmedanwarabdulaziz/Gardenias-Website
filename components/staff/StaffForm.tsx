'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Paper,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import BrandButton from '@/components/shared/BrandButton';
import BrandTypography from '@/components/shared/BrandTypography';

interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  title: string;
  picture?: string;
  shortDescription: string;
  corporateName?: string;
  address?: string;
  isActive: boolean;
}

interface StaffFormProps {
  staff?: StaffFormData | null;
  onSave: (data: StaffFormData) => void;
  onCancel: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`staff-tabpanel-${index}`}
      aria-labelledby={`staff-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function StaffForm({ staff, onSave, onCancel }: StaffFormProps) {
  const [formData, setFormData] = useState<StaffFormData>({
    name: staff?.name || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    title: staff?.title || '',
    picture: staff?.picture || '',
    shortDescription: staff?.shortDescription || '',
    corporateName: staff?.corporateName || '',
    address: staff?.address || '',
    isActive: staff?.isActive ?? true,
  });

  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<Partial<StaffFormData>>({});
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload - in production, upload to Firebase Storage
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, picture: reader.result as string }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleChange = (field: keyof StaffFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : event.target.value;
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StaffFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: '#008d80',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#008d80',
            },
          }}
        >
          <Tab label="Basic Info" />
          <Tab label="Professional Details" />
          <Tab label="Contact Information" />
          <Tab label="Additional Info" />
        </Tabs>

        {/* Basic Info Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
            {/* Profile Picture */}
            <Box>
              <Box sx={{ textAlign: 'center' }}>
                <BrandTypography variant="subheader" sx={{ mb: 2 }}>
                  Profile Picture
                </BrandTypography>
                
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed #008d80',
                    borderRadius: 2,
                    p: 3,
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? '#f0f8f7' : 'transparent',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: '#f0f8f7',
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  <Avatar
                    src={formData.picture}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: '#008d80',
                    }}
                  >
                    <PhotoCameraIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  
                  {isUploading ? (
                    <BrandTypography variant="text" sx={{ color: '#008d80' }}>
                      Uploading...
                    </BrandTypography>
                  ) : (
                    <BrandTypography variant="text" sx={{ color: '#008d80' }}>
                      {isDragActive ? 'Drop image here' : 'Click or drag to upload'}
                    </BrandTypography>
                  )}
                  
                  <BrandTypography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                    PNG, JPG, WEBP up to 5MB
                  </BrandTypography>
                </Box>
              </Box>
            </Box>

            {/* Basic Information */}
            <Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                {/* Name - Required */}
                <Box>
                  <TextField
                    fullWidth
                    label="Full Name *"
                    value={formData.name}
                    onChange={handleChange('name')}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#008d80',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#008d80',
                      },
                    }}
                  />
                </Box>

                {/* Email - Required */}
                <Box>
                  <TextField
                    fullWidth
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#008d80',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#008d80',
                      },
                    }}
                  />
                </Box>

                {/* Phone - Required */}
                <Box>
                  <TextField
                    fullWidth
                    label="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#008d80',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#008d80',
                      },
                    }}
                  />
                </Box>

                {/* Title - Required */}
                <Box>
                  <TextField
                    fullWidth
                    label="Job Title *"
                    value={formData.title}
                    onChange={handleChange('title')}
                    error={!!errors.title}
                    helperText={errors.title}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#008d80',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#008d80',
                      },
                    }}
                  />
                </Box>

                {/* Short Description - Required */}
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <TextField
                    fullWidth
                    label="Short Description *"
                    multiline
                    rows={3}
                    value={formData.shortDescription}
                    onChange={handleChange('shortDescription')}
                    error={!!errors.shortDescription}
                    helperText={errors.shortDescription || 'Brief description of the staff member\'s role and expertise'}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#008d80',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#008d80',
                      },
                    }}
                  />
                </Box>

                {/* Corporate Name - Optional */}
                <Box>
                  <TextField
                    fullWidth
                    label="Corporate Name"
                    value={formData.corporateName}
                    onChange={handleChange('corporateName')}
                    helperText="Optional: Company or organization name"
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#008d80',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#008d80',
                      },
                    }}
                  />
                </Box>

                {/* Address - Optional */}
                <Box>
                  <TextField
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={handleChange('address')}
                    helperText="Optional: Office or work address"
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#008d80',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#008d80',
                      },
                    }}
                  />
                </Box>

                {/* Active Status */}
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isActive}
                        onChange={handleChange('isActive')}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#008d80',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#008d80',
                          },
                        }}
                      />
                    }
                    label={
                      <BrandTypography variant="text">
                        Active Staff Member
                      </BrandTypography>
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </TabPanel>

        {/* Other tabs will be implemented later */}
        <TabPanel value={activeTab} index={1}>
          <BrandTypography variant="text" sx={{ color: 'text.secondary' }}>
            Professional Details tab - Coming soon
          </BrandTypography>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <BrandTypography variant="text" sx={{ color: 'text.secondary' }}>
            Contact Information tab - Coming soon
          </BrandTypography>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <BrandTypography variant="text" sx={{ color: 'text.secondary' }}>
            Additional Info tab - Coming soon
          </BrandTypography>
        </TabPanel>
      </Paper>

      {/* Form Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          startIcon={<CancelIcon />}
          sx={{
            borderColor: '#008d80',
            color: '#008d80',
            '&:hover': {
              borderColor: '#006b5f',
              backgroundColor: '#f0f8f7',
            },
          }}
        >
          Cancel
        </Button>
        <BrandButton
          type="submit"
          variant="primary"
          startIcon={<SaveIcon />}
        >
          {staff ? 'Update Staff Member' : 'Add Staff Member'}
        </BrandButton>
      </Box>
    </Box>
  );
}
