# 🚀 Vercel Deployment Guide

This guide will help you securely deploy your Content Management System to Vercel for your live website at **https://expression.ngo** with all necessary security configurations.

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run setup-admin` locally
- [ ] Test the admin system locally at `http://localhost:3000/admin`
- [ ] Test the preview functionality with your content
- [ ] Change the default admin password
- [ ] Prepare environment variables for Vercel

## 🔧 Vercel Environment Variables Setup

### Required Environment Variables

When you deploy to Vercel, you need to add these environment variables in your Vercel project settings:

```bash
# Security Configuration
JWT_SECRET=your-jwt-secret-from-setup
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-password-hash-from-setup

# Rate Limiting
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=900000

# Environment
NODE_ENV=production
```

### How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard for expression.ngo
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable:
   - **Name**: Variable name (e.g., `JWT_SECRET`)
   - **Value**: Variable value (copy from your setup output)
   - **Environment**: Select "Production", "Preview", and "Development"

### ⚠️ Important Notes

- **DO NOT escape the `$` characters** in the password hash when adding to Vercel
- The password hash should look like: `$2a$12$...` (not `\$2a\$12\$...`)
- Local `.env.local` needs escaped characters, but Vercel does not

## 🛡️ Security Configuration

### Vercel.json Security Headers

The project includes a `vercel.json` file with security headers:

```json
{
  "headers": [
    {
      "source": "/admin/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

These headers provide:
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### Domain Security

For production deployment at **expression.ngo**:

1. **HTTPS Only**: Vercel automatically provides HTTPS
2. **Custom Domain**: Already configured for expression.ngo
3. **Environment Variables**: Never commit secrets to your repository
4. **Admin Access**: Only accessible at `https://expression.ngo/admin`

## 🚀 Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository for expression.ngo
4. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

Copy the values from your local setup script output:

```bash
# From your setup-admin script output, copy these values to Vercel:
JWT_SECRET=your-generated-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-generated-hash  # WITHOUT escaping!
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=900000
NODE_ENV=production
```

### 3. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your site will be available at `https://expression.ngo`

### 4. Access Admin Panel

- Visit: `https://expression.ngo/admin`
- Login with your credentials
- **Immediately change the default password!**

## 🔒 Post-Deployment Security

### 1. Change Default Password

After first login to the production admin panel:
1. Create a new secure password
2. Run the setup script again locally with your new password
3. Update the `ADMIN_PASSWORD_HASH` environment variable in Vercel
4. Redeploy to apply the new password

### 2. Monitor Access

- Check Vercel's function logs for any suspicious login attempts
- Monitor the rate limiting (failed login attempts)
- Consider adding IP allowlisting if needed

### 3. Regular Security Updates

- Keep dependencies updated with `npm audit`
- Regularly rotate JWT secrets and passwords
- Monitor for security advisories in your dependencies

## 🔄 Content Management Workflow

### Safe Editing Process

1. **Local Testing**: Edit and preview content locally at `http://localhost:3000/admin`
2. **Preview Changes**: Use the preview feature to see exactly how changes will look
3. **Deploy to Production**: When satisfied, deploy your changes to https://expression.ngo
4. **Live Admin Access**: Access the production admin at `https://expression.ngo/admin`

### Environment Variable Management

| Environment | Password Hash Format | Location |
|-------------|---------------------|----------|
| **Development** | `\$2a\$12\$...` (escaped) | `.env.local` |
| **Production** | `$2a$12$...` (not escaped) | Vercel Settings |

### Updating Content on Live Site

Two approaches for updating content:

**Option A: Local Development → Deploy**
1. Edit content locally with preview
2. Commit and push changes to trigger deployment
3. Changes automatically go live at expression.ngo

**Option B: Direct Production Admin**
1. Login to `https://expression.ngo/admin`
2. Edit content directly on production
3. Use preview to test before saving
4. Changes go live immediately

## 🆘 Troubleshooting

### Login Issues

**Problem**: "Invalid credentials" error at https://expression.ngo/admin
**Solution**: 
1. Check that environment variables are set correctly in Vercel
2. Ensure password hash is NOT escaped in Vercel (should start with `$2a$12$`)
3. Verify the JWT_SECRET is set

**Problem**: Rate limiting issues
**Solution**:
1. Check the `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW` settings
2. Wait 15 minutes for rate limit to reset
3. Adjust rate limiting values if needed

### Deployment Issues

**Problem**: Build fails
**Solution**:
1. Check that all dependencies are in `package.json`
2. Verify environment variables are set
3. Check Vercel build logs for specific errors

**Problem**: Admin panel not accessible at expression.ngo/admin
**Solution**:
1. Ensure the `/admin` route is not blocked
2. Check that all required files are committed to Git
3. Verify environment variables are properly set

### Preview Issues

**Problem**: Preview not working on production
**Solution**:
1. Check that you're logged in when creating previews
2. Verify content syntax is valid TypeScript
3. Preview links expire after 30 minutes - create a new one

## 📊 Monitoring and Maintenance

### Vercel Analytics

Enable Vercel Analytics to monitor:
- Page views and performance on expression.ngo
- API route usage (including admin endpoints)
- Error rates and user experience

### Security Monitoring

Regularly check:
- Function logs for failed login attempts at /admin
- Unusual access patterns to expression.ngo
- Performance metrics for the CMS

### Backup Strategy

- Automatic backups are created before each content change
- Consider setting up automated database backups if you extend the system
- Keep your environment variables secure and backed up
- Regular Git commits serve as content version control

## 🎯 Production Best Practices

1. **Use Strong Passwords**: Generate secure passwords, don't use defaults
2. **Regular Updates**: Keep your dependencies updated
3. **Monitor Access**: Check logs regularly for suspicious activity at /admin
4. **Secure Environment Variables**: Never expose secrets in client-side code
5. **HTTPS Only**: Always use HTTPS in production (Vercel provides this automatically)
6. **Content Workflow**: Test locally with preview before deploying to expression.ngo

## 🌐 Live Website Information

- **Live Site**: https://expression.ngo
- **Admin Panel**: https://expression.ngo/admin
- **Preview Feature**: Available both locally and in production
- **Content Updates**: Can be done locally or directly on production

Your secure Content Management System is now ready for production deployment at **expression.ngo**! 🎉

The preview feature allows you to safely test content changes both locally and on the live site before publishing them to your visitors.