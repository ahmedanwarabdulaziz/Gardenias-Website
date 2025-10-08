'use client';

import { useState, useEffect } from 'react';
import { StaffService, StaffMember } from '@/lib/staffService';
import { LocalStaffService } from '@/lib/localStaffService';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Grid,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BrandButton from '@/components/shared/BrandButton';
import BrandTypography from '@/components/shared/BrandTypography';
import StaffFormNew from '@/components/staff/StaffFormNew';

// StaffMember interface is now imported from staffService

interface SortableStaffCardProps {
  staff: StaffMember;
  onEdit: (staff: StaffMember) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

function SortableStaffCard({ staff, onEdit, onDelete, onToggleActive }: SortableStaffCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: staff.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        cursor: isDragging ? 'grabbing' : 'grab',
        border: isDragging ? '2px dashed #008d80' : '1px solid #e0e0e0',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,141,128,0.15)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Drag Handle */}
          <Box
            {...attributes}
            {...listeners}
            sx={{
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              p: 1,
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
              },
            }}
          >
            <DragIcon sx={{ color: '#008d80' }} />
          </Box>

          {/* Staff Avatar */}
          <Avatar
            src={staff.picture}
            sx={{
              width: 60,
              height: 60,
              bgcolor: '#008d80',
            }}
          >
            <PersonIcon />
          </Avatar>

          {/* Staff Info */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <BrandTypography variant="subheader" sx={{ fontWeight: 600 }}>
                {staff.name}
              </BrandTypography>
              <Chip
                label={staff.isActive ? 'Active' : 'Inactive'}
                color={staff.isActive ? 'success' : 'default'}
                size="small"
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <WorkIcon sx={{ fontSize: 16, color: '#008d80' }} />
              <BrandTypography variant="text" sx={{ fontSize: '0.875rem' }}>
                {staff.title}
              </BrandTypography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <EmailIcon sx={{ fontSize: 16, color: '#008d80' }} />
              <BrandTypography variant="text" sx={{ fontSize: '0.875rem' }}>
                {staff.email}
              </BrandTypography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 16, color: '#008d80' }} />
              <BrandTypography variant="text" sx={{ fontSize: '0.875rem' }}>
                {staff.phone}
              </BrandTypography>
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={staff.isActive}
                  onChange={() => onToggleActive(staff.id)}
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
              label=""
            />
            
            <Tooltip title="Edit Staff">
              <IconButton
                onClick={() => onEdit(staff)}
                sx={{ color: '#008d80' }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Delete Staff">
              <IconButton
                onClick={() => onDelete(staff.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load staff from Firebase with localStorage fallback
  useEffect(() => {
    const loadStaff = async () => {
      try {
        // Try Firebase first
        const staffData = await StaffService.getStaff();
        setStaff(staffData);
        console.log('Loaded staff from Firebase');
      } catch (error) {
        console.error('Firebase error, using localStorage:', error);
        // Fallback to localStorage
        const localStaff = LocalStaffService.getStaff();
        setStaff(localStaff);
        console.log('Loaded staff from localStorage');
      }
    };

    loadStaff();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const newStaff = arrayMove(
        staff,
        staff.findIndex((item) => item.id === active.id),
        staff.findIndex((item) => item.id === over?.id)
      ).map((item, index) => ({
        ...item,
        order: index,
      }));

      setStaff(newStaff);

      // Update order in Firebase with localStorage fallback
      try {
        const staffUpdates = newStaff.map((member, index) => ({
          id: member.id,
          order: index,
        }));
        
        // Try Firebase first
        await StaffService.updateStaffOrder(staffUpdates);
        console.log('Staff order updated in Firebase');
      } catch (error) {
        console.error('Firebase error, using localStorage:', error);
        // Fallback to localStorage
        LocalStaffService.updateStaffOrder(newStaff.map((member, index) => ({
          id: member.id,
          order: index,
        })));
        console.log('Staff order updated in localStorage');
      }
    }
  };

  const handleAddStaff = () => {
    setEditingStaff(null);
    setOpenDialog(true);
  };

  const handleEditStaff = (staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setOpenDialog(true);
  };

  const handleDeleteStaff = (id: string) => {
    setDeleteDialog(id);
  };

  const confirmDelete = async () => {
    if (deleteDialog) {
      try {
        // Try Firebase first
        await StaffService.deleteStaff(deleteDialog);
        console.log('Staff deleted from Firebase');
      } catch (error) {
        console.error('Firebase error, using localStorage:', error);
        // Fallback to localStorage
        LocalStaffService.deleteStaff(deleteDialog);
        console.log('Staff deleted from localStorage');
      }
      
      setStaff(staff.filter((member) => member.id !== deleteDialog));
      setDeleteDialog(null);
    }
  };

  const handleToggleActive = async (id: string) => {
    const member = staff.find(m => m.id === id);
    if (member) {
      try {
        // Try Firebase first
        await StaffService.toggleStaffStatus(id, !member.isActive);
        console.log('Staff status updated in Firebase');
      } catch (error) {
        console.error('Firebase error, using localStorage:', error);
        // Fallback to localStorage
        LocalStaffService.toggleStaffStatus(id, !member.isActive);
        console.log('Staff status updated in localStorage');
      }
      
      setStaff(staff.map((m) =>
        m.id === id ? { ...m, isActive: !m.isActive } : m
      ));
    }
  };

  const handleSaveStaff = async (staffData: Omit<StaffMember, 'id' | 'order' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingStaff) {
        // Update existing staff
        try {
          await StaffService.updateStaff(editingStaff.id, staffData);
          console.log('Staff updated in Firebase');
        } catch (error) {
          console.error('Firebase error, using localStorage:', error);
          LocalStaffService.updateStaff(editingStaff.id, staffData);
          console.log('Staff updated in localStorage');
        }
        
        setStaff(staff.map((member) =>
          member.id === editingStaff.id
            ? { ...member, ...staffData, updatedAt: new Date() }
            : member
        ));
      } else {
        // Add new staff
        const newStaffData = {
          ...staffData,
          order: staff.length,
        };
        
        let newId: string;
        try {
          newId = await StaffService.addStaff(newStaffData);
          console.log('Staff added to Firebase');
        } catch (error) {
          console.error('Firebase error, using localStorage:', error);
          newId = LocalStaffService.addStaff(newStaffData);
          console.log('Staff added to localStorage');
        }
        
        const newStaff: StaffMember = {
          ...newStaffData,
          id: newId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setStaff([...staff, newStaff]);
      }
      setOpenDialog(false);
      setEditingStaff(null);
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <BrandTypography variant="header">
            Staff Management
          </BrandTypography>
          <BrandButton
            variant="primary"
            startIcon={<AddIcon />}
            onClick={handleAddStaff}
          >
            Add Staff Member
          </BrandButton>
        </Box>

        <BrandTypography variant="text" sx={{ color: 'text.secondary', mb: 3 }}>
          Manage your healthcare team. Drag and drop to reorder staff members.
        </BrandTypography>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={staff.map((member) => member.id)}
            strategy={verticalListSortingStrategy}
          >
            {staff.map((member) => (
              <SortableStaffCard
                key={member.id}
                staff={member}
                onEdit={handleEditStaff}
                onDelete={handleDeleteStaff}
                onToggleActive={handleToggleActive}
              />
            ))}
          </SortableContext>
        </DndContext>

        {staff.length === 0 && (
          <Card sx={{ textAlign: 'center', py: 6 }}>
            <CardContent>
              <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <BrandTypography variant="subheader" sx={{ mb: 1 }}>
                No Staff Members Yet
              </BrandTypography>
              <BrandTypography variant="text" sx={{ color: 'text.secondary', mb: 3 }}>
                Add your first staff member to get started.
              </BrandTypography>
              <BrandButton
                variant="primary"
                startIcon={<AddIcon />}
                onClick={handleAddStaff}
              >
                Add First Staff Member
              </BrandButton>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Staff Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
      >
        <DialogTitle>
          {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        </DialogTitle>
        <DialogContent>
          <StaffFormNew
            staff={editingStaff}
            onSave={handleSaveStaff}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
      >
        <DialogTitle>Delete Staff Member</DialogTitle>
        <DialogContent>
          <BrandTypography variant="text">
            Are you sure you want to delete this staff member? This action cannot be undone.
          </BrandTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
