import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import AuthService from './auth';

export interface SocialMedia {
  id: string;
  name: string;
  platform: 'Facebook' | 'Instagram' | 'Twitter' | 'LinkedIn' | 'YouTube' | 'TikTok';
  url: string;
  isEnabled: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export class SocialMediaService {
  private static readonly COLLECTION_NAME = 'socialMedia';

  // Get all social media links
  static async getAllSocialMedia(): Promise<SocialMedia[]> {
    try {
      const socialMediaRef = collection(db, this.COLLECTION_NAME);
      const querySnapshot = await getDocs(socialMediaRef);

      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        platform: doc.data().platform,
        url: doc.data().url || '',
        isEnabled: doc.data().isEnabled ?? false,
        displayOrder: doc.data().displayOrder ?? 0,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        createdBy: doc.data().createdBy || '',
      })) as SocialMedia[];

      // Sort by display order in memory
      return items.sort((a, b) => a.displayOrder - b.displayOrder);
    } catch (error) {
      console.error('Error fetching social media:', error);
      throw error;
    }
  }

  // Get enabled social media links (for public display)
  static async getEnabledSocialMedia(): Promise<SocialMedia[]> {
    try {
      const socialMediaRef = collection(db, this.COLLECTION_NAME);
      const querySnapshot = await getDocs(socialMediaRef);

      const items = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          name: doc.data().name,
          platform: doc.data().platform,
          url: doc.data().url || '',
          isEnabled: doc.data().isEnabled ?? false,
          displayOrder: doc.data().displayOrder ?? 0,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          createdBy: doc.data().createdBy || '',
        }))
        .filter(item => item.isEnabled && item.url) as SocialMedia[];

      // Sort by display order in memory
      return items.sort((a, b) => a.displayOrder - b.displayOrder);
    } catch (error) {
      console.error('Error fetching enabled social media:', error);
      return [];
    }
  }

  // Add new social media link
  static async addSocialMedia(data: Omit<SocialMedia, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<string> {
    try {
      const user = AuthService.getCurrentUser();
      
      const socialMediaRef = collection(db, this.COLLECTION_NAME);
      const docRef = await addDoc(socialMediaRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user?.email || 'system',
      });

      return docRef.id;
    } catch (error) {
      console.error('Error adding social media:', error);
      throw error;
    }
  }

  // Update social media link
  static async updateSocialMedia(id: string, data: Partial<Omit<SocialMedia, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>): Promise<void> {
    try {
      const socialMediaRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(socialMediaRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating social media:', error);
      throw error;
    }
  }

  // Delete social media link
  static async deleteSocialMedia(id: string): Promise<void> {
    try {
      const socialMediaRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(socialMediaRef);
    } catch (error) {
      console.error('Error deleting social media:', error);
      throw error;
    }
  }
}

