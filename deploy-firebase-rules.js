#!/usr/bin/env node

/**
 * Script to deploy Firebase rules
 * Run this with: node deploy-firebase-rules.js
 */

const { execSync } = require('child_process');

console.log('🚀 Deploying Firebase rules...');

try {
  // Deploy Firestore rules
  console.log('📝 Deploying Firestore rules...');
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  
  // Deploy Storage rules
  console.log('📦 Deploying Storage rules...');
  execSync('firebase deploy --only storage', { stdio: 'inherit' });
  
  console.log('✅ Firebase rules deployed successfully!');
  console.log('🔗 You can now use the staff management system with Firebase!');
  
} catch (error) {
  console.error('❌ Error deploying Firebase rules:', error.message);
  console.log('💡 Make sure you have Firebase CLI installed and are logged in:');
  console.log('   npm install -g firebase-tools');
  console.log('   firebase login');
  console.log('   firebase use gardenias-522c7');
}
