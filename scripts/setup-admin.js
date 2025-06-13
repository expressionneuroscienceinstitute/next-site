#!/usr/bin/env node

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

async function setupAdmin() {
  console.log('🔐 Setting up Content Management System Admin');
  console.log('');

  // Generate a secure JWT secret if one doesn't exist
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  
  // Default password (user should change this)
  const defaultPassword = 'admin123!';
  
  // Hash the password
  const passwordHash = await bcrypt.hash(defaultPassword, 12);
  
  // Create environment variables
  const envContent = `# CMS Security Configuration
JWT_SECRET=${jwtSecret}
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=${passwordHash}

# Rate Limiting
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=900000

# Environment
NODE_ENV=development`;

  // Write to .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent);

  console.log('✅ Admin setup complete!');
  console.log('');
  console.log('📋 Your admin credentials:');
  console.log(`   Username: admin`);
  console.log(`   Password: ${defaultPassword}`);
  console.log('');
  console.log('🔒 Security notes:');
  console.log('   - Change the default password immediately after first login');
  console.log('   - Access the admin panel at: http://localhost:3000/admin');
  console.log('   - The JWT secret has been randomly generated');
  console.log('   - Rate limiting is enabled (10 attempts per 15 minutes)');
  console.log('');
  console.log('🚀 Start the development server with: npm run dev');
  console.log('');
}

setupAdmin().catch(console.error);