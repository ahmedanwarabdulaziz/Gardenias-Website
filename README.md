# Gardenias Healthcare - Massage Therapy Clinic Website

A professional, modern website for Gardenias Healthcare Massage Therapy Clinic built with Next.js, TypeScript, and Tailwind CSS.

## 🎨 Brand Colors

- **Green**: #008d80 (Primary brand color)
- **Orange**: #fe812b (Accent color)
- **White**: #ffffff (Background and text)

## 🚀 Features

- **Professional Design**: Modern, clean design optimized for healthcare industry
- **Responsive**: Fully responsive design that works on all devices
- **SEO Optimized**: Built with Next.js for excellent search engine optimization
- **Fast Performance**: Optimized images and code for fast loading times
- **Accessible**: WCAG compliant design for accessibility
- **Mobile-First**: Designed with mobile users in mind

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Public Sans (Google Fonts)

## 📁 Project Structure

```
gardenias-healthcare/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   └── Footer.tsx          # Footer component
├── public/
│   └── img/                # Images (pic002.png for hero)
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gardenias-healthcare
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📸 Images

The website uses the following images from the `img/` folder:
- `pic002.png` - Hero section background image
- Additional images available for future sections

## 🎯 Current Sections

### ✅ Completed
- **Header**: Professional navigation with mobile menu
- **Hero Section**: Compelling hero with call-to-action
- **Footer**: Comprehensive footer with contact info and links

### 🔄 Next Steps
- Services section
- About us section
- Therapist profiles
- Contact form
- Booking system
- Testimonials

## 🎨 Customization

### Colors
Update the brand colors in `tailwind.config.js`:
```javascript
colors: {
  'gardenias-green': '#008d80',
  'gardenias-orange': '#fe812b',
  'gardenias-white': '#ffffff',
}
```

### Content
- Update contact information in `components/Header.tsx` and `components/Footer.tsx`
- Modify hero content in `components/Hero.tsx`
- Update metadata in `app/layout.tsx`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

This project is created for Gardenias Healthcare. All rights reserved.

## 🤝 Support

For support or questions, please contact the development team.

---

**Gardenias Healthcare** - Where wellness meets professional care.
