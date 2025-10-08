'use client';

import React, { useState, useEffect } from 'react';
import { ServiceService, Service } from '@/lib/serviceService';
import { CategoryService, Category } from '@/lib/categoryService';
import { StaffService, StaffMember } from '@/lib/staffService';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Collapse,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Category as CategoryIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  DragIndicator as DragIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import BrandButton from '@/components/shared/BrandButton';
import BrandTypography from '@/components/shared/BrandTypography';
import ServiceForm from '@/components/services/ServiceForm';

// Sortable Service Row Component
function SortableServiceRow({ 
  service, 
  onEdit, 
  onDelete, 
  onToggle, 
  getCategoryName 
}: { 
  service: Service; 
  onEdit: (service: Service) => void; 
  onDelete: (id: string) => void; 
  onToggle: (id: string) => void;
  getCategoryName: (id: string) => string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriceRange = (sessionDurations: any[]) => {
    if (!sessionDurations || sessionDurations.length === 0) return 'N/A';
    const prices = sessionDurations.map(s => s.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      sx={{
        '&:hover': {
          backgroundColor: 'grey.50',
        },
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <TableCell sx={{ width: 50, cursor: 'grab' }} {...attributes} {...listeners}>
        <DragIcon sx={{ color: 'grey.400' }} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={service.icon} 
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: 'primary.main',
              color: 'white'
            }}
          >
            <CategoryIcon />
          </Avatar>
          <Box>
            <BrandTypography variant="text" sx={{ fontWeight: 600 }}>
              {service.name}
            </BrandTypography>
            <BrandTypography variant="caption" sx={{ color: 'text.secondary' }}>
              {getCategoryName(service.categoryId)}
            </BrandTypography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <BrandTypography variant="text">
          {service.sessionDurations?.length || 0}
        </BrandTypography>
      </TableCell>
      <TableCell>
        <BrandTypography variant="text">
          {getPriceRange(service.sessionDurations)}
        </BrandTypography>
      </TableCell>
      <TableCell>
        <Chip
          label={service.taxType === 'taxable' ? 'Taxable' : 'Non-Taxable'}
          size="small"
          color={service.taxType === 'taxable' ? 'warning' : 'success'}
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <Chip
          label={service.isActive ? 'Active' : 'Inactive'}
          color={service.isActive ? 'success' : 'default'}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            onClick={() => onToggle(service.id)} 
            color="primary"
            size="small"
          >
            {service.isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
          </IconButton>
          <IconButton 
            onClick={() => onEdit(service)} 
            color="info"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            onClick={() => onDelete(service.id)} 
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load services, categories, and staff from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, categoriesData, staffData] = await Promise.all([
          ServiceService.getServices(),
          CategoryService.getCategories(),
          StaffService.getStaff()
        ]);
        setServices(servicesData);
        setCategories(categoriesData);
        setStaff(staffData);
        console.log('Loaded services, categories, and staff from Firebase');
      } catch (error) {
        console.error('Error loading data:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load data',
          severity: 'error',
        });
      }
    };

    loadData();
  }, []);

  const handleAddService = () => {
    setEditingService(null);
    setOpenDialog(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setOpenDialog(true);
  };

  const handleDeleteService = (id: string) => {
    setDeleteDialog(id);
  };

  const confirmDelete = async () => {
    if (deleteDialog) {
      try {
        await ServiceService.deleteService(deleteDialog);
        setServices(services.filter((service) => service.id !== deleteDialog));
        setDeleteDialog(null);
        setSnackbar({
          open: true,
          message: 'Service deleted successfully',
          severity: 'success',
        });
      } catch (error) {
        console.error('Error deleting service:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete service',
          severity: 'error',
        });
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    const service = services.find(s => s.id === id);
    if (service) {
      try {
        await ServiceService.updateService(id, { isActive: !service.isActive });
        setServices(services.map((s) =>
          s.id === id ? { ...s, isActive: !s.isActive } : s
        ));
        setSnackbar({
          open: true,
          message: `Service ${!service.isActive ? 'activated' : 'deactivated'} successfully`,
          severity: 'success',
        });
      } catch (error) {
        console.error('Error toggling service status:', error);
        setSnackbar({
          open: true,
          message: 'Failed to update service status',
          severity: 'error',
        });
      }
    }
  };

  const handleSaveService = async (serviceData: any) => {
    console.log('handleSaveService called with:', serviceData);
    try {
      if (editingService) {
        console.log('Updating existing service:', editingService.id);
        await ServiceService.updateService(editingService.id, serviceData);
        setServices(services.map((service) =>
          service.id === editingService.id
            ? { ...service, ...serviceData, updatedAt: new Date() }
            : service
        ));
        setSnackbar({
          open: true,
          message: 'Service updated successfully',
          severity: 'success',
        });
      } else {
        console.log('Adding new service');
        const newId = await ServiceService.addService(serviceData);
        console.log('New service ID:', newId);
        const newService: Service = {
          ...serviceData,
          id: newId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'admin', // You'll need to get this from auth
        };
        setServices([...services, newService]);
        setSnackbar({
          open: true,
          message: 'Service added successfully',
          severity: 'success',
        });
      }
      setOpenDialog(false);
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save service',
        severity: 'error',
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown Category';
  };

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    const categoryName = getCategoryName(service.categoryId);
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  // Handle drag end
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setServices((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        
        // Update displayOrder for all services and save to database
        const updatedServices = reorderedItems.map((service, index) => ({
          id: service.id,
          displayOrder: index,
        }));
        
        // Save to database
        ServiceService.updateDisplayOrder(updatedServices)
          .then(() => {
            setSnackbar({
              open: true,
              message: 'Service order updated successfully',
              severity: 'success',
            });
          })
          .catch((error) => {
            console.error('Error updating service order:', error);
            setSnackbar({
              open: true,
              message: 'Failed to update service order',
              severity: 'error',
            });
          });
        
        return reorderedItems;
      });
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <BrandTypography variant="header">Service Management</BrandTypography>
          <BrandButton variant="primary" onClick={handleAddService} icon={<AddIcon />}>
            Add Service
          </BrandButton>
        </Box>

        {services.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <BrandTypography variant="text">Loading services or no services found...</BrandTypography>
          </Box>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell sx={{ width: 50 }}>Drag</TableCell>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Durations</TableCell>
                    <TableCell>Price Range</TableCell>
                    <TableCell>Tax Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(groupedServices).map(([categoryName, categoryServices]) => (
                    <React.Fragment key={categoryName}>
                      {/* Category Header Row - Inline with table structure */}
                      <TableRow 
                        sx={{ 
                          backgroundColor: 'primary.50',
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: 'primary.100' },
                          borderBottom: '2px solid',
                          borderBottomColor: 'primary.200'
                        }}
                        onClick={() => toggleCategory(categoryName)}
                      >
                        <TableCell sx={{ py: 2, width: '60px' }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            transition: 'transform 0.2s ease'
                          }}>
                            {expandedCategories.has(categoryName) ? 
                              <ExpandLessIcon sx={{ fontSize: 20 }} /> : 
                              <ExpandMoreIcon sx={{ fontSize: 20 }} />
                            }
                          </Box>
                        </TableCell>
                        
                        <TableCell sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <BrandTypography variant="subheader" sx={{ color: 'primary.main', fontWeight: 600, fontSize: '1.1rem' }}>
                              {categoryName}
                            </BrandTypography>
                            
                            <Chip
                              label={`${categoryServices.length} service${categoryServices.length !== 1 ? 's' : ''}`}
                              size="small"
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '24px',
                                '& .MuiChip-label': {
                                  px: 1.5
                                }
                              }}
                            />
                          </Box>
                        </TableCell>
                        
                        <TableCell sx={{ py: 2 }}>
                          {/* Empty cell */}
                        </TableCell>
                        
                        <TableCell sx={{ py: 2 }}>
                          {/* Empty cell */}
                        </TableCell>
                        
                        <TableCell sx={{ py: 2 }}>
                          {/* Empty cell */}
                        </TableCell>
                        
                        <TableCell sx={{ py: 2 }}>
                          {/* Empty cell */}
                        </TableCell>
                        
                        <TableCell sx={{ py: 2 }}>
                          {/* Empty cell */}
                        </TableCell>
                      </TableRow>
                      
                      {/* Services in Category */}
                      {expandedCategories.has(categoryName) && (
                        <SortableContext items={categoryServices.map(s => s.id)} strategy={verticalListSortingStrategy}>
                          {categoryServices.map((service) => (
                            <SortableServiceRow
                              key={service.id}
                              service={service}
                              onEdit={handleEditService}
                              onDelete={handleDeleteService}
                              onToggle={handleToggleActive}
                              getCategoryName={getCategoryName}
                            />
                          ))}
                        </SortableContext>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DndContext>
        )}
      </Box>

      {/* Service Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth={false}
        fullWidth
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '95vh',
            height: '95vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <ServiceForm
          service={editingService}
          onSave={handleSaveService}
          onCancel={() => setOpenDialog(false)}
          categories={categories}
          staff={staff}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
      >
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>
          <BrandTypography variant="text">
            Are you sure you want to delete this service? This action cannot be undone.
          </BrandTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
