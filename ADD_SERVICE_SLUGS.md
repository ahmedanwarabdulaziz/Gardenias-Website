# Add Service Slugs Migration

This migration adds the `slug` field to all services that are missing it.

## Problem
Some services (like "General Massage Therapy") don't have a slug field, causing them to use the service ID in URLs instead of readable slugs.

## Solution
Run the migration script to automatically generate slugs for all services.

## Steps

### 1. Get Firebase Service Account Key

If you don't already have it:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Save as `serviceAccountKey.json` in the `healthcare-system` directory
6. **DO NOT commit this file** (it's in `.gitignore`)

### 2. Run the Migration Script

```bash
cd healthcare-system
node scripts/add-service-slugs.js
```

### 3. Expected Output

```
Starting service slug migration...
Found 5 services.
  - "Physical Therapy" already has slug: "physical-therapy"
  - "General Massage Therapy" → slug: "general-massage-therapy"
  - "Chiropractic Care" already has slug: "chiropractic-care"
  ...

✅ Successfully added slugs to 1 service(s)!
🎉 Migration completed successfully!
```

## What the Script Does

1. Fetches all services from Firestore
2. For each service without a slug:
   - Generates a slug from the service name
   - Updates the service with the new slug
3. Skips services that already have slugs

## Slug Generation Rules

- Converts name to lowercase
- Removes special characters
- Replaces spaces with hyphens
- Removes multiple consecutive hyphens

Examples:
- "General Massage Therapy" → "general-massage-therapy"
- "Physical Therapy & Rehab" → "physical-therapy-rehab"
- "Sports   Medicine" → "sports-medicine"

## Verify

After running the migration:
1. Restart your dev server
2. Visit the services page
3. Click on "General Massage Therapy"
4. URL should now be: `http://localhost:3000/services/general-massage-therapy`

## Troubleshooting

### Error: Cannot find module '../serviceAccountKey.json'
- You need to download the service account key from Firebase Console
- Save it as `serviceAccountKey.json` in the `healthcare-system` directory

### Error: Permission denied
- Make sure your Firebase service account has Firestore write permissions

## Alternative: Manual Update

You can also add slugs manually through the admin panel:
1. Go to Admin Dashboard → Services
2. Edit each service
3. The slug field will be auto-generated when you save

