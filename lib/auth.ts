// Simple authentication service for admin
export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
}

class AuthService {
  private static readonly ADMIN_USERNAME = 'admin@a.com';
  private static readonly ADMIN_PASSWORD = '5550555'; // The password you mentioned
  private static readonly AUTH_KEY = 'healthcare_admin_auth';

  // Login with username and password
  static async login(username: string, password: string): Promise<boolean> {
    console.log('Login attempt:', { username, password });
    console.log('Expected:', { username: this.ADMIN_USERNAME, password: this.ADMIN_PASSWORD });
    
    if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
      // Store authentication in localStorage
      const authData = {
        username: this.ADMIN_USERNAME,
        isAuthenticated: true,
        loginTime: Date.now()
      };
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
      console.log('Admin authentication successful');
      return true;
    }
    console.log('Invalid credentials - username or password mismatch');
    return false;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const authData = localStorage.getItem(this.AUTH_KEY);
      if (!authData) return false;
      
      const auth = JSON.parse(authData);
      
      // Check if session is still valid (24 hours)
      const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      if (Date.now() - auth.loginTime > sessionTimeout) {
        this.logout();
        return false;
      }
      
      return auth.isAuthenticated === true;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Get current user
  static getCurrentUser(): AuthUser | null {
    if (!this.isAuthenticated()) return null;
    
    try {
      const authData = localStorage.getItem(this.AUTH_KEY);
      if (!authData) return null;
      
      const auth = JSON.parse(authData);
      return {
        username: auth.username,
        isAuthenticated: auth.isAuthenticated
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Logout
  static logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    console.log('Admin logged out');
  }

  // Check if user has permission to access admin features
  static hasAdminAccess(): boolean {
    return this.isAuthenticated();
  }
}

export default AuthService;