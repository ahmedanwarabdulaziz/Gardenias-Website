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
  slug?: string;
  picture?: string;
  heroImage?: string;
  shortDescription: string;
  shortBio?: string;
  fullBiography?: string;
  credentials?: string;
  areasOfSpecialization?: string[];
  yearsOfExperience?: string;
  spokenLanguages?: string[];
  education?: Array<{
    institution: string;
    program: string;
    year: string;
  }>;
  associations?: string;
  email?: string;
  phone?: string;
  bookingLink?: string;
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
          slug: doc.data().slug,
          picture: doc.data().picture,
          heroImage: doc.data().heroImage,
          shortDescription: doc.data().shortDescription,
          shortBio: doc.data().shortBio,
          fullBiography: doc.data().fullBiography,
          credentials: doc.data().credentials,
          areasOfSpecialization: doc.data().areasOfSpecialization || [],
          yearsOfExperience: doc.data().yearsOfExperience,
          spokenLanguages: doc.data().spokenLanguages || [],
          education: doc.data().education || [],
          associations: doc.data().associations,
          email: doc.data().email,
          phone: doc.data().phone,
          bookingLink: doc.data().bookingLink,
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

  // Get a single staff member by slug
  static async getStaffBySlug(slug: string): Promise<PublicStaffMember | null> {
    try {
      const allStaff = await this.getPublicStaff();
      const staff = allStaff.find(s => s.slug === slug || s.id === slug);
      return staff || null;
    } catch (error) {
      console.error('Error fetching staff by slug:', error);
      return null;
    }
  }
}

