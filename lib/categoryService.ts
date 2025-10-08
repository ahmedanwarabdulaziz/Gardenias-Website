import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import AuthService from './auth';

export interface Category {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  isActive: boolean;
  // Visuals & Design
  icon?: string; // Base64 data URL
  cardBanner?: string; // Base64 data URL for card display
  coverImage?: string; // Base64 data URL for page banner
  accentColor: string; // Default: #008d80
  displayOrder: number;
  // Meta & Additional Info
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  notes?: string; // Admin comments
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryService {
  private static readonly COLLECTION_NAME = 'categories';

  // Ensure authentication
  private static async ensureAuth(): Promise<void> {
    const isAuthenticated = AuthService.hasAdminAccess();
    if (!isAuthenticated) {
      throw new Error('Admin authentication required');
    }
    console.log('Admin authentication verified for categories');
  }

  // Compress image to reduce size
  private static async compressImage(dataUrl: string, maxWidth: number = 600, quality: number = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    });
  }

  // Generate slug from name
  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }

  // Get all categories
  static async getCategories(): Promise<Category[]> {
    try {
      await this.ensureAuth();

      const categoriesRef = collection(db, this.COLLECTION_NAME);
      const q = query(categoriesRef, orderBy('displayOrder', 'asc'));
      const querySnapshot = await getDocs(q);

      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Category[];

      console.log('Categories loaded from Firebase:', categories.length, 'categories');
      return categories;
    } catch (error) {
      console.error('Firebase error, using localStorage:', error);
      return this.getMockCategories();
    }
  }

  // Mock data for development
  private static getMockCategories(): Category[] {
    return [
      {
        id: '1',
        name: 'Massage Therapy',
        shortDescription: 'Professional therapeutic massage services for relaxation and healing.',
        fullDescription: 'Our massage therapy services provide comprehensive therapeutic treatments designed to promote healing, reduce stress, and improve overall well-being. Our licensed therapists use various techniques including Swedish, deep tissue, and hot stone massage to address your specific needs.',
        isActive: true,
        accentColor: '#008d80',
        displayOrder: 0,
        slug: 'massage-therapy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Physical Therapy',
        shortDescription: 'Rehabilitation and recovery services for injury treatment and prevention.',
        fullDescription: 'Our physical therapy program focuses on helping patients recover from injuries, manage chronic conditions, and improve mobility. Our certified therapists develop personalized treatment plans using evidence-based techniques and state-of-the-art equipment.',
        isActive: true,
        accentColor: '#008d80',
        displayOrder: 1,
        slug: 'physical-therapy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  // Add new category
  static async addCategory(categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    console.log('CategoryService.addCategory called with:', categoryData);
    try {
      await this.ensureAuth();
      console.log('Authentication successful');

      // Handle image compression
      let processedCategoryData = { ...categoryData };
      if (categoryData.icon && categoryData.icon.startsWith('data:')) {
        try {
          const compressedIcon = await this.compressImage(categoryData.icon, 600, 0.8);
          processedCategoryData.icon = compressedIcon;
          console.log('Icon processed and stored');
        } catch (imageError) {
          console.error('Icon processing failed:', imageError);
          processedCategoryData.icon = '';
        }
      }

      if (categoryData.coverImage && categoryData.coverImage.startsWith('data:')) {
        try {
          const compressedCover = await this.compressImage(categoryData.coverImage, 1200, 0.8);
          processedCategoryData.coverImage = compressedCover;
          console.log('Cover image processed and stored');
        } catch (imageError) {
          console.error('Cover image processing failed:', imageError);
          processedCategoryData.coverImage = '';
        }
      }

      // Generate slug if not provided
      if (!processedCategoryData.slug) {
        processedCategoryData.slug = this.generateSlug(processedCategoryData.name);
      }

      const categoriesRef = collection(db, this.COLLECTION_NAME);
      console.log('Adding to Firebase collection:', this.COLLECTION_NAME);
      console.log('Data to add:', processedCategoryData);
      
      const docRef = await addDoc(categoriesRef, {
        ...processedCategoryData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log('Category added to Firebase with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Firebase error, using localStorage:', error);
      const mockId = Date.now().toString();
      console.log('Category added to localStorage with ID:', mockId);
      return mockId;
    }
  }

  // Update category
  static async updateCategory(id: string, categoryData: Partial<Category>): Promise<void> {
    try {
      await this.ensureAuth();

      // Handle image compression
      let processedCategoryData = { ...categoryData };
      if (categoryData.icon && categoryData.icon.startsWith('data:')) {
        try {
          const compressedIcon = await this.compressImage(categoryData.icon, 600, 0.8);
          processedCategoryData.icon = compressedIcon;
          console.log('Icon processed and stored');
        } catch (imageError) {
          console.error('Icon processing failed, keeping existing:', imageError);
          delete processedCategoryData.icon;
        }
      }

      if (categoryData.coverImage && categoryData.coverImage.startsWith('data:')) {
        try {
          const compressedCover = await this.compressImage(categoryData.coverImage, 1200, 0.8);
          processedCategoryData.coverImage = compressedCover;
          console.log('Cover image processed and stored');
        } catch (imageError) {
          console.error('Cover image processing failed, keeping existing:', imageError);
          delete processedCategoryData.coverImage;
        }
      }

      // Generate slug if name changed
      if (categoryData.name && !categoryData.slug) {
        processedCategoryData.slug = this.generateSlug(categoryData.name);
      }

      const categoryRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(categoryRef, {
        ...processedCategoryData,
        updatedAt: serverTimestamp(),
      });

      console.log('Category updated in Firebase:', id);
    } catch (error) {
      console.error('Firebase error, using localStorage:', error);
      console.log('Update will be handled locally');
    }
  }

  // Delete category
  static async deleteCategory(id: string): Promise<void> {
    try {
      await this.ensureAuth();

      const categoryRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(categoryRef);

      console.log('Category deleted from Firebase:', id);
    } catch (error) {
      console.error('Firebase error, using localStorage:', error);
      console.log('Delete will be handled locally');
    }
  }

  // Update category order
  static async updateCategoryOrder(categoryUpdates: { id: string; displayOrder: number }[]): Promise<void> {
    try {
      await this.ensureAuth();

      const updatePromises = categoryUpdates.map(({ id, displayOrder }) => {
        const categoryRef = doc(db, this.COLLECTION_NAME, id);
        return updateDoc(categoryRef, {
          displayOrder,
          updatedAt: serverTimestamp(),
        });
      });

      await Promise.all(updatePromises);
      console.log('Category order updated in Firebase');
    } catch (error) {
      console.error('Firebase error, using localStorage:', error);
      console.log('Order update will be handled locally');
    }
  }

  // Toggle category active status
  static async toggleCategoryStatus(id: string, isActive: boolean): Promise<void> {
    try {
      await this.ensureAuth();

      const categoryRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(categoryRef, {
        isActive,
        updatedAt: serverTimestamp(),
      });
      console.log('Category status toggled in Firebase:', id, 'to', isActive);
    } catch (error) {
      console.error('Firebase error, using localStorage:', error);
      console.log('Status toggle will be handled locally');
    }
  }
}
