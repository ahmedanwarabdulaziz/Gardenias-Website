# Firebase Setup Instructions

## 🔥 Firebase Configuration

Your healthcare system is configured to use Firebase for data storage. Follow these steps to set up Firebase properly:

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Project
```bash
firebase use gardenias-522c7
```

### 4. Deploy Security Rules
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules  
firebase deploy --only storage
```

Or run the automated script:
```bash
node deploy-firebase-rules.js
```

## 🔐 Security Rules

### Firestore Rules
- ✅ **Authenticated users** can read/write to `staff` collection
- ✅ **Anonymous authentication** enabled for development
- ✅ **Secure access** to all collections

### Storage Rules
- ✅ **Authenticated users** can upload images
- ✅ **Staff pictures** stored in `staff-pictures/` folder
- ✅ **Secure file access** with authentication

## 🚀 Features Working

### Staff Management
- ✅ **Add Staff** - Saves to Firebase Firestore
- ✅ **Edit Staff** - Updates Firebase records
- ✅ **Delete Staff** - Removes from Firebase
- ✅ **Image Upload** - Stores in Firebase Storage
- ✅ **Drag & Drop** - Updates order in Firebase
- ✅ **Real-time Sync** - Data syncs across devices

### Image Handling
- ✅ **Large Images** - Automatically uploaded to Firebase Storage
- ✅ **Optimized URLs** - Direct links to Firebase Storage
- ✅ **No Size Limits** - Firebase Storage handles large files
- ✅ **Secure Access** - Images protected by authentication

## 🔧 Troubleshooting

### If Firebase Authentication Fails
- Check Firebase project configuration
- Verify security rules are deployed
- Ensure anonymous authentication is enabled

### If Images Don't Upload
- Check Firebase Storage rules
- Verify storage bucket configuration
- Ensure user is authenticated

### If Data Doesn't Save
- Check Firestore rules
- Verify collection permissions
- Check browser console for errors

## 📱 Testing

1. **Add a staff member** with an image
2. **Check Firebase Console** - Data should appear in Firestore
3. **Check Storage** - Images should appear in Firebase Storage
4. **Refresh page** - Data should persist
5. **Open in new browser** - Data should sync

## 🎯 Production Deployment

For production deployment:
1. Update security rules for production
2. Configure proper authentication
3. Set up user management
4. Deploy to Firebase Hosting

Your healthcare system is now fully integrated with Firebase! 🎉
