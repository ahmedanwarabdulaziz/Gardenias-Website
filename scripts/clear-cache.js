#!/usr/bin/env node

/**
 * Script to clear Next.js cache and prevent stale content issues
 * Run this before starting development server
 */

const fs = require('fs');
const path = require('path');

const cacheDirs = [
  '.next',
  'node_modules/.cache',
  '.turbo',
];

const log = (message) => {
  console.log(`🧹 ${message}`);
};

const clearDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    log(`Clearing ${dirPath}...`);
    fs.rmSync(dirPath, { recursive: true, force: true });
    log(`✅ Cleared ${dirPath}`);
  } else {
    log(`⚠️  ${dirPath} does not exist, skipping...`);
  }
};

const main = () => {
  log('Starting cache clearing process...');
  
  cacheDirs.forEach(clearDirectory);
  
  // Clear browser cache indicators
  const timestamp = Date.now();
  const envFile = '.env.local';
  
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf8');
    const newContent = content.replace(
      /BUILD_VERSION=.*/g,
      `BUILD_VERSION=${timestamp}`
    );
    fs.writeFileSync(envFile, newContent);
  } else {
    fs.writeFileSync(envFile, `BUILD_VERSION=${timestamp}\n`);
  }
  
  log('✅ Cache clearing complete!');
  log('💡 You can now run: npm run dev:clean');
};

main();
