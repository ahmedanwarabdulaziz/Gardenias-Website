import {
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';

export interface PublicStaffMember {
  id: string;
  name: string;
  title: string;
  picture?: string;
  shortDescription: string;
  shortBio?: string;
  credentials?: string;
  areasOfSpecialization?: string[];
  yearsOfExperience?: string;
  spokenLanguages?: string[];
  order: number;
}

// Public service - no authentication required for website display
export class PublicStaffService {
  // Get all active staff members for public display
  static async getPublicStaff(): Promise<PublicStaffMember[]> {
    try {
      const staffRef = collection(db, 'staff');
      const q = query(staffRef, orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);

      const staff = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          name: doc.data().name,
          title: doc.data().title,
          picture: doc.data().picture,
          shortDescription: doc.data().shortDescription,
          shortBio: doc.data().shortBio,
          credentials: doc.data().credentials,
          areasOfSpecialization: doc.data().areasOfSpecialization || [],
          yearsOfExperience: doc.data().yearsOfExperience,
          spokenLanguages: doc.data().spokenLanguages || [],
          isActive: doc.data().isActive,
          order: doc.data().order ?? 0,
        }))
        .filter(member => member.isActive); // Filter active in memory

      return staff as PublicStaffMember[];
    } catch (error) {
      console.error('Error fetching public staff:', error);
      return [];
    }
  }
}

