#!/usr/bin/env node

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

async function setupAdmin() {
  console.log('🔐 Setting up Content Management System Admin for Vercel');
  console.log('');

  // Generate a secure JWT secret
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  
  // Default password (user should change this)
  const defaultPassword = 'admin123!';
  
  // Hash the password with explicit salt rounds
  console.log('Generating secure password hash...');
  const passwordHash = await bcrypt.hash(defaultPassword, 12);
  
  // Test the hash immediately
  const testVerification = await bcrypt.compare(defaultPassword, passwordHash);
  console.log('Password hash verification test:', testVerification ? '✅ Passed' : '❌ Failed');
  
  if (!testVerification) {
    console.error('❌ Password hash generation failed. Please try again.');
    process.exit(1);
  }
  
  // Escape the password hash for environment variables (escape $ characters)
  const escapedPasswordHash = passwordHash.replace(/\$/g, '\\$');
  
  // Create environment variables
  const envContent = `# CMS Security Configuration - Generated ${new Date().toISOString()}
JWT_SECRET="${jwtSecret}"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="${escapedPasswordHash}"

# Rate Limiting
RATE_LIMIT_MAX="10"
RATE_LIMIT_WINDOW="900000"

# Environment
NODE_ENV="development"`;

  // Write to .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent);
  
  // Also create .env.example for Vercel deployment reference
  const envExampleContent = `# CMS Security Configuration
# Copy these to your Vercel environment variables (without escaping)
JWT_SECRET=your-secure-jwt-secret-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-bcrypt-password-hash-here

# Rate Limiting  
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=900000

# Environment
NODE_ENV=production`;

  const envExamplePath = path.join(process.cwd(), '.env.example');
  fs.writeFileSync(envExamplePath, envExampleContent);

  console.log('✅ Admin setup complete!');
  console.log('');
  console.log('📋 Your admin credentials:');
  console.log(`   Username: admin`);
  console.log(`   Password: ${defaultPassword}`);
  console.log('');
  console.log('🔒 Security information:');
  console.log(`   JWT Secret: ${jwtSecret}`);
  console.log(`   Password Hash: ${passwordHash}`);
  console.log('');
  console.log('🚀 For Vercel deployment:');
  console.log('   1. Add these environment variables to your Vercel project:');
  console.log(`      JWT_SECRET=${jwtSecret}`);
  console.log(`      ADMIN_USERNAME=admin`);
  console.log(`      ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log(`      RATE_LIMIT_MAX=10`);
  console.log(`      RATE_LIMIT_WINDOW=900000`);
  console.log(`      NODE_ENV=production`);
  console.log('');
  console.log('   ⚠️  Note: In Vercel, do NOT escape the $ characters in the password hash');
  console.log('');
  console.log('🔧 Local development:');
  console.log('   - Access the admin panel at: http://localhost:3000/admin');
  console.log('   - Start with: npm run dev');
  console.log('');
  console.log('⚠️  IMPORTANT: Change the default password after first login!');
}

setupAdmin().catch(console.error);