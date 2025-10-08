/**
 * Migration script to add slug field to services that are missing it
 * Run this script once to update all existing services
 * 
 * Usage: node scripts/add-service-slugs.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

async function addServiceSlugs() {
  console.log('Starting service slug migration...');
  
  try {
    const servicesRef = db.collection('services');
    const snapshot = await servicesRef.get();
    
    if (snapshot.empty) {
      console.log('No services found.');
      return;
    }
    
    console.log(`Found ${snapshot.size} services.`);
    
    const batch = db.batch();
    let updateCount = 0;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Only update if slug doesn't exist or is empty
      if (!data.slug) {
        const slug = generateSlug(data.name);
        batch.update(doc.ref, {
          slug: slug,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        updateCount++;
        console.log(`  - "${data.name}" → slug: "${slug}"`);
      } else {
        console.log(`  - "${data.name}" already has slug: "${data.slug}"`);
      }
    });
    
    if (updateCount > 0) {
      await batch.commit();
      console.log(`\n✅ Successfully added slugs to ${updateCount} service(s)!`);
    } else {
      console.log('\n✅ All services already have slugs.');
    }
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run migration
(async () => {
  try {
    await addServiceSlugs();
    console.log('\n🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
})();

