/**
 * Migration script to add displayOrder field to existing services
 * Run this script once to update all existing services in the database
 * 
 * Usage: node scripts/migrate-display-order.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateServices() {
  console.log('Starting services migration...');
  
  try {
    const servicesRef = db.collection('services');
    const snapshot = await servicesRef.get();
    
    if (snapshot.empty) {
      console.log('No services found to migrate.');
      return;
    }
    
    console.log(`Found ${snapshot.size} services to migrate.`);
    
    // Get all services and sort by createdAt to maintain original order
    const services = [];
    snapshot.forEach(doc => {
      services.push({
        id: doc.id,
        data: doc.data(),
        ref: doc.ref
      });
    });
    
    // Sort by createdAt to maintain original order
    services.sort((a, b) => {
      const aTime = a.data.createdAt?.toMillis() || 0;
      const bTime = b.data.createdAt?.toMillis() || 0;
      return aTime - bTime;
    });
    
    // Update each service with displayOrder
    const batch = db.batch();
    let updateCount = 0;
    
    services.forEach((service, index) => {
      // Only update if displayOrder doesn't exist
      if (service.data.displayOrder === undefined) {
        batch.update(service.ref, {
          displayOrder: index,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        updateCount++;
        console.log(`  - ${service.data.name}: displayOrder = ${index}`);
      } else {
        console.log(`  - ${service.data.name}: already has displayOrder = ${service.data.displayOrder}`);
      }
    });
    
    if (updateCount > 0) {
      await batch.commit();
      console.log(`\nSuccessfully migrated ${updateCount} services!`);
    } else {
      console.log('\nAll services already have displayOrder field.');
    }
    
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

async function migrateCategories() {
  console.log('\nChecking categories...');
  
  try {
    const categoriesRef = db.collection('categories');
    const snapshot = await categoriesRef.get();
    
    if (snapshot.empty) {
      console.log('No categories found.');
      return;
    }
    
    console.log(`Found ${snapshot.size} categories.`);
    
    // Check if any category is missing displayOrder
    const categoriesToUpdate = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.displayOrder === undefined) {
        categoriesToUpdate.push({
          id: doc.id,
          name: data.name,
          ref: doc.ref,
          createdAt: data.createdAt
        });
      }
    });
    
    if (categoriesToUpdate.length > 0) {
      console.log(`Found ${categoriesToUpdate.length} categories without displayOrder.`);
      
      // Sort by createdAt
      categoriesToUpdate.sort((a, b) => {
        const aTime = a.createdAt?.toMillis() || 0;
        const bTime = b.createdAt?.toMillis() || 0;
        return aTime - bTime;
      });
      
      // Update each category
      const batch = db.batch();
      categoriesToUpdate.forEach((category, index) => {
        batch.update(category.ref, {
          displayOrder: index,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`  - ${category.name}: displayOrder = ${index}`);
      });
      
      await batch.commit();
      console.log(`\nSuccessfully migrated ${categoriesToUpdate.length} categories!`);
    } else {
      console.log('All categories already have displayOrder field.');
    }
    
  } catch (error) {
    console.error('Error during category migration:', error);
    process.exit(1);
  }
}

// Run migrations
(async () => {
  try {
    await migrateServices();
    await migrateCategories();
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
})();

