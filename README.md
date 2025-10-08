# Gardenias Healthcare System

A professional healthcare management system built with Next.js 14, Material-UI, and Firebase.

## 🏥 Features

### Dashboard (Admin Panel)
- **Secure Authentication** - Password-protected admin access
- **Patient Management** - Comprehensive patient records and data
- **Appointment Scheduling** - Easy appointment booking and management
- **Analytics Dashboard** - Real-time healthcare statistics
- **Data Management** - Secure storage and retrieval of medical data

### Website (Public)
- **SEO Optimized** - Fast loading with professional design
- **Responsive Design** - Mobile-first approach
- **Cloudflare Integration** - Image optimization and CDN
- **Professional UI** - Material-UI components for consistency

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Material-UI (MUI) - No CSS conflicts
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Images**: Cloudflare Image Optimization
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Firebase is already configured with your credentials
   - Cloudflare account ID is set up
   - No additional environment variables needed

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Access

### Dashboard Access
- **URL**: `/dashboard/login`
- **Password**: `5550555`
- **Features**: Patient management, appointments, analytics

### Website Access
- **URL**: `/website`
- **Features**: Public website with SEO optimization

## 🏗️ Project Structure

```
healthcare-system/
├── app/
│   ├── dashboard/          # Admin panel
│   │   ├── login/          # Authentication
│   │   ├── patients/       # Patient management
│   │   ├── appointments/   # Appointment scheduling
│   │   └── analytics/      # Statistics dashboard
│   ├── website/           # Public website
│   │   ├── about/         # About page
│   │   ├── services/      # Services page
│   │   └── contact/       # Contact page
│   └── api/               # API routes
├── components/
│   ├── dashboard/         # Dashboard components
│   ├── website/          # Website components
│   └── shared/           # Shared components
├── lib/
│   ├── firebase.ts        # Firebase configuration
│   ├── cloudflare.ts      # Cloudflare image optimization
│   ├── auth.ts           # Authentication logic
│   └── theme.ts          # Material-UI theme
└── types/                # TypeScript definitions
```

## 🎨 Design System

### Colors
- **Primary**: #274290 (Blue) - Headers, navigation
- **Secondary**: #f27921 (Orange) - Accents, CTAs
- **Background**: #f8f9fa (Light gray) - Page backgrounds

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Source Sans Pro (sans-serif)

## 🔧 Configuration

### Firebase
- Project ID: `gardenias-522c7`
- Authentication: Email/password
- Database: Firestore
- Storage: Firebase Storage

### Cloudflare
- Account ID: `Pn5aH9t_IMjyKLkdUjS2aW7RxAMbrOPpcWqtLfGx`
- Image optimization enabled
- CDN for fast loading

## 📱 Responsive Design

- Mobile-first approach
- Material-UI responsive breakpoints
- Optimized for all screen sizes
- Touch-friendly interface

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push
3. Environment variables are pre-configured

### Manual Deployment
```bash
npm run build
npm start
```

## 🔒 Security

- Password-protected admin access
- Firebase security rules
- HTTPS enforcement
- Secure data transmission

## 📊 Performance

- Next.js 14 App Router
- Image optimization with Cloudflare
- Material-UI optimized components
- Fast loading times

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Material-UI for consistent design
- Firebase for secure backend

## 📞 Support

For technical support or questions:
- Email: support@gardeniashealth.com
- Phone: (555) 123-4567

## 📄 License

© 2024 Gardenias Healthcare. All rights reserved.