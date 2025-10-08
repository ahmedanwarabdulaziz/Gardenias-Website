'use client';

import { useState, useEffect } from 'react';
import { CategoryService, Category } from '@/lib/categoryService';
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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  DragIndicator as DragIcon,
  Add as AddIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Palette as PaletteIcon,
  Image as ImageIcon,
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BrandButton from '@/components/shared/BrandButton';
import BrandTypography from '@/components/shared/BrandTypography';
import CategoryForm from '@/components/categories/CategoryForm';

interface SortableCategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

function SortableCategoryCard({ category, onEdit, onDelete, onToggleActive }: SortableCategoryCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      sx={{ 
        width: '100%', 
        mb: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        boxShadow: 2,
        '&:hover': {
          boxShadow: 4,
          borderColor: '#008d80',
        },
        transition: 'all 0.2s ease',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton 
            {...listeners} 
            sx={{ 
              cursor: 'grab',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
              }
            }}
          >
            <DragIcon />
          </IconButton>
          
          {category.icon ? (
            <Box
              component="img"
              src={category.icon}
              sx={{
                width: 70,
                height: 70,
                borderRadius: 2,
                objectFit: 'cover',
                border: '3px solid',
                borderColor: 'grey.100',
                boxShadow: 1,
              }}
            />
          ) : (
            <Avatar 
              sx={{ 
                width: 70, 
                height: 70, 
                bgcolor: category.accentColor || 'primary.main',
                color: 'white',
                border: '3px solid',
                borderColor: 'grey.100',
              }}
            >
              <CategoryIcon sx={{ fontSize: 30 }} />
            </Avatar>
          )}
          
          <Box sx={{ flexGrow: 1 }}>
            <BrandTypography variant="subheader" sx={{ mb: 1, color: 'primary.main' }}>
              {category.name}
            </BrandTypography>
            <BrandTypography variant="text" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
              {category.shortDescription}
            </BrandTypography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip
                label={category.isActive ? 'Active' : 'Inactive'}
                color={category.isActive ? 'success' : 'default'}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={`/${category.slug}`}
                variant="outlined"
                size="small"
                sx={{ color: 'text.secondary' }}
              />
            </Box>
            {category.seoTitle && (
              <BrandTypography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                SEO: {category.seoTitle}
              </BrandTypography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => onToggleActive(category.id)} 
              color="primary"
              sx={{ 
                '&:hover': { bgcolor: 'primary.light' }
              }}
            >
              {category.isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
            </IconButton>
            <IconButton 
              onClick={() => onEdit(category)} 
              color="info"
              sx={{ 
                '&:hover': { bgcolor: 'info.light' }
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              onClick={() => onDelete(category.id)} 
              color="error"
              sx={{ 
                '&:hover': { bgcolor: 'error.light' }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
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

  // Load categories from Firebase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await CategoryService.getCategories();
        setCategories(categoriesData);
        console.log('Loaded categories from Firebase');
      } catch (error) {
        console.error('Error loading categories:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load categories',
          severity: 'error',
        });
      }
    };

    loadCategories();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const newCategories = arrayMove(
        categories,
        categories.findIndex((item) => item.id === active.id),
        categories.findIndex((item) => item.id === over?.id)
      ).map((item, index) => ({
        ...item,
        displayOrder: index,
      }));

      setCategories(newCategories);

      // Update order in Firebase
      try {
        const categoryUpdates = newCategories.map((category, index) => ({
          id: category.id,
          displayOrder: index,
        }));

        await CategoryService.updateCategoryOrder(categoryUpdates);
        console.log('Category order updated in Firebase');
      } catch (error) {
        console.error('Error updating category order:', error);
        setSnackbar({
          open: true,
          message: 'Failed to update category order',
          severity: 'error',
        });
      }
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setOpenDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setOpenDialog(true);
  };

  const handleDeleteCategory = (id: string) => {
    setDeleteDialog(id);
  };

  const confirmDelete = async () => {
    if (deleteDialog) {
      try {
        await CategoryService.deleteCategory(deleteDialog);
        setCategories(categories.filter((category) => category.id !== deleteDialog));
        setDeleteDialog(null);
        setSnackbar({
          open: true,
          message: 'Category deleted successfully',
          severity: 'success',
        });
      } catch (error) {
        console.error('Error deleting category:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete category',
          severity: 'error',
        });
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      try {
        await CategoryService.toggleCategoryStatus(id, !category.isActive);
        setCategories(categories.map((c) =>
          c.id === id ? { ...c, isActive: !c.isActive } : c
        ));
        setSnackbar({
          open: true,
          message: `Category ${!category.isActive ? 'activated' : 'deactivated'} successfully`,
          severity: 'success',
        });
      } catch (error) {
        console.error('Error toggling category status:', error);
        setSnackbar({
          open: true,
          message: 'Failed to update category status',
          severity: 'error',
        });
      }
    }
  };

  const handleSaveCategory = async (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('handleSaveCategory called with:', categoryData);
    try {
      if (editingCategory) {
        console.log('Updating existing category:', editingCategory.id);
        // Update existing category
        await CategoryService.updateCategory(editingCategory.id, categoryData);
        setCategories(categories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...categoryData, updatedAt: new Date() }
            : category
        ));
        setSnackbar({
          open: true,
          message: 'Category updated successfully',
          severity: 'success',
        });
      } else {
        console.log('Adding new category');
        // Add new category
        const newId = await CategoryService.addCategory(categoryData);
        console.log('New category ID:', newId);
        const newCategory: Category = {
          ...categoryData,
          id: newId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setCategories([...categories, newCategory]);
        setSnackbar({
          open: true,
          message: 'Category added successfully',
          severity: 'success',
        });
      }
      setOpenDialog(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save category',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <BrandTypography variant="header">Category Management</BrandTypography>
          <BrandButton variant="primary" onClick={handleAddCategory} icon={<AddIcon />}>
            Add Category
          </BrandButton>
        </Box>

        {categories.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <BrandTypography variant="text">Loading categories or no categories found...</BrandTypography>
          </Box>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {categories.map((category) => (
                <SortableCategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </Box>

      {/* Category Form Dialog */}
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
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setOpenDialog(false)}
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
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <BrandTypography variant="text">
            Are you sure you want to delete this category? This action cannot be undone.
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
