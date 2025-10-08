# Display Order Migration Guide

This guide explains how to add the `displayOrder` field to existing services and categories in your Firestore database.

## What Changed

We've added a `displayOrder` field to both services and categories to enable drag-and-drop reordering in the admin dashboard. This field determines the order in which items are displayed on the website.

## Features

- ✅ **Services**: Can now be reordered via drag and drop in the admin panel
- ✅ **Categories**: Already had drag and drop, now services have it too
- ✅ **Public Display**: Services and categories display in the order you set via drag and drop
- ✅ **Database Order**: The display order is persisted in Firestore

## Migration Steps

### 1. Deploy Firestore Indexes

First, deploy the updated Firestore indexes:

```bash
cd healthcare-system
firebase deploy --only firestore:indexes
```

This will create the necessary indexes for querying by `displayOrder`.

### 2. Run the Migration Script

**Important**: You need a Firebase Admin SDK service account key file.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Save the file as `serviceAccountKey.json` in the `healthcare-system` directory
6. **DO NOT commit this file to git** (it's in `.gitignore`)

Then run the migration:

```bash
cd healthcare-system
node scripts/migrate-display-order.js
```

This script will:
- Add `displayOrder` field to all existing services (based on creation date)
- Add `displayOrder` field to any categories missing it
- Preserve the original order based on `createdAt` timestamps

### 3. Verify in Admin Dashboard

1. Start your development server: `npm run dev`
2. Log into the admin dashboard
3. Go to Services or Categories
4. Try dragging and dropping items to reorder them
5. Check that the order is saved and reflected on the public website

## How It Works

### In Admin Dashboard

1. Services and categories are displayed in tables with drag handles (⋮⋮)
2. Drag an item to reorder it
3. The new order is automatically saved to Firestore
4. All items get their `displayOrder` field updated

### On Public Website

1. Services are fetched from Firestore ordered by `displayOrder`
2. Categories are also ordered by `displayOrder`
3. The order matches what you set in the admin dashboard

## Database Schema

### Service Document
```javascript
{
  // ... other fields
  displayOrder: 0, // Integer, lower numbers appear first
  // ... other fields
}
```

### Category Document
```javascript
{
  // ... other fields
  displayOrder: 0, // Integer, lower numbers appear first
  // ... other fields
}
```

## Troubleshooting

### Services not displaying in the right order

1. Check that the migration script ran successfully
2. Verify in Firebase Console that services have the `displayOrder` field
3. Check browser console for any Firestore query errors
4. Ensure Firestore indexes are deployed

### Drag and drop not working

1. Clear your browser cache
2. Check browser console for errors
3. Ensure you're logged in as an admin
4. Verify that Firebase connection is working

### Index errors in console

Run:
```bash
firebase deploy --only firestore:indexes
```

Wait a few minutes for indexes to build in Firebase.

## Rollback

If you need to rollback:

1. The migration is non-destructive (it only adds a field)
2. You can manually remove `displayOrder` fields in Firebase Console
3. Or run this in Firebase Console:

```javascript
// In Firestore console
db.collection('services').get().then(snapshot => {
  snapshot.forEach(doc => {
    doc.ref.update({displayOrder: firebase.firestore.FieldValue.delete()});
  });
});
```

## Support

If you encounter any issues, check:
- Firebase Console for Firestore rules and indexes
- Browser console for error messages
- Server logs for any backend errors

