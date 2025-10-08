// Local storage fallback for staff management during development
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  picture?: string;
  shortDescription: string;
  corporateName?: string;
  address?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export class LocalStaffService {
  private static readonly STORAGE_KEY = 'healthcare_staff';

  // Get all staff members from localStorage
  static getStaff(): StaffMember[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const staff = JSON.parse(stored);
        return staff.map((member: StaffMember) => ({
          ...member,
          createdAt: new Date(member.createdAt),
          updatedAt: new Date(member.updatedAt),
        }));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
    
    // Return default staff if no data
    return this.getDefaultStaff();
  }

  // Save staff to localStorage
  static saveStaff(staff: StaffMember[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(staff));
      console.log('Staff saved to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Add new staff member
  static addStaff(staffData: Omit<StaffMember, 'id' | 'createdAt' | 'updatedAt'>): string {
    const staff = this.getStaff();
    const newStaff: StaffMember = {
      ...staffData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    staff.push(newStaff);
    this.saveStaff(staff);
    return newStaff.id;
  }

  // Update staff member
  static updateStaff(id: string, staffData: Partial<StaffMember>): void {
    const staff = this.getStaff();
    const index = staff.findIndex(member => member.id === id);
    
    if (index !== -1) {
      staff[index] = {
        ...staff[index],
        ...staffData,
        updatedAt: new Date(),
      };
      this.saveStaff(staff);
    }
  }

  // Delete staff member
  static deleteStaff(id: string): void {
    const staff = this.getStaff();
    const filteredStaff = staff.filter(member => member.id !== id);
    this.saveStaff(filteredStaff);
  }

  // Update staff order
  static updateStaffOrder(staffUpdates: { id: string; order: number }[]): void {
    const staff = this.getStaff();
    
    staffUpdates.forEach(({ id, order }) => {
      const member = staff.find(m => m.id === id);
      if (member) {
        member.order = order;
        member.updatedAt = new Date();
      }
    });
    
    this.saveStaff(staff);
  }

  // Toggle staff status
  static toggleStaffStatus(id: string, isActive: boolean): void {
    this.updateStaff(id, { isActive, updatedAt: new Date() });
  }

  // Get default staff data
  private static getDefaultStaff(): StaffMember[] {
    return [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@healthcare.com',
        phone: '(555) 123-4567',
        title: 'Chief Medical Officer',
        shortDescription: 'Experienced physician with 15+ years in healthcare management.',
        isActive: true,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        email: 'michael.chen@healthcare.com',
        phone: '(555) 234-5678',
        title: 'Senior Cardiologist',
        shortDescription: 'Specialized in cardiovascular diseases and preventive care.',
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@healthcare.com',
        phone: '(555) 345-6789',
        title: 'Pediatric Specialist',
        shortDescription: 'Dedicated to children\'s health and family medicine.',
        isActive: false,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
