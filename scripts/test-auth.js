#!/usr/bin/env node

const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function testAuth() {
  console.log('🔍 Testing Authentication System');
  console.log('');
  
  const username = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;
  
  console.log('Environment Variables:');
  console.log(`- ADMIN_USERNAME: ${username}`);
  console.log(`- ADMIN_PASSWORD_HASH: ${passwordHash ? '✅ Set' : '❌ Missing'}`);
  console.log(`- JWT_SECRET: ${jwtSecret ? '✅ Set' : '❌ Missing'}`);
  console.log('');
  
  if (!passwordHash) {
    console.log('❌ Password hash is missing from environment variables');
    return;
  }
  
  // Test password verification
  const testPassword = 'admin123!';
  console.log(`Testing password: "${testPassword}"`);
  
  try {
    const isValid = await bcrypt.compare(testPassword, passwordHash);
    console.log(`Password verification: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    
    if (!isValid) {
      console.log('');
      console.log('🔧 Let me generate a new hash for the default password:');
      const newHash = await bcrypt.hash(testPassword, 12);
      console.log(`New hash: ${newHash}`);
      console.log('');
      console.log('Update your .env.local file with this hash:');
      console.log(`ADMIN_PASSWORD_HASH=${newHash}`);
    }
  } catch (error) {
    console.log(`❌ Error testing password: ${error.message}`);
  }
}

testAuth().catch(console.error);