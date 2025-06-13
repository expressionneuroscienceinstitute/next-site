# 🔐 Secure Content Management System

A secure, web-based content management system for your Expression Neuroscience Institute website. This system allows you to edit all text content through a modern, secure web interface.

## 🚀 Quick Start

1. **Setup Admin Account**:
   ```bash
   npm run setup-admin
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access Admin Panel**:
   Visit: `http://localhost:3000/admin`
   
   **Default Credentials**:
   - Username: `admin`
   - Password: `admin123!`

## 🛡️ Security Features

### Authentication & Authorization
- **JWT-based sessions** with secure HTTP-only cookies
- **Bcrypt password hashing** (12 rounds) for maximum security
- **Rate limiting** (10 attempts per 15 minutes) to prevent brute force attacks
- **Session expiration** (24 hours) with automatic cleanup
- **CSRF protection** through SameSite cookies

### Content Protection
- **Automatic backups** created before each save
- **Syntax validation** to prevent breaking the website
- **File access controls** - only predefined config files can be edited
- **Input sanitization** and validation on all endpoints

### Security Headers & Best Practices
- **Secure cookies** in production with HTTPS
- **Environment variable protection** for sensitive data
- **Error handling** without information disclosure
- **Content type validation** to prevent injection attacks

## 📝 Editable Content

The CMS allows you to edit the following content files:

| File | Description | Content |
|------|-------------|---------|
| **About Page** | Mission, board members, future vision | Team bios, mission statement, organization goals |
| **Roadmap** | Research timeline and program roadmap | Project timelines, milestones, research programs |
| **Donate Page** | Donation page content and messaging | Call-to-action text, donation messaging |
| **Research Page** | Research datasets and publications | Research listings, publication links |
| **Document Links** | Footer document links and navigation | PDF links, governance documents |

## 🎯 How to Use

### 1. Login
- Navigate to `/admin`
- Enter your credentials
- You'll be automatically redirected to the dashboard

### 2. Edit Content
- Click "Edit Content" on any content file
- Make your changes in the editor
- The system shows unsaved changes with visual indicators
- Click "Save Changes" to apply your edits

### 3. Features
- **Real-time feedback**: See character/line counts and change indicators
- **Revert changes**: Undo modifications before saving
- **Automatic backups**: Previous versions are saved automatically
- **Syntax highlighting**: Code-friendly editor for TypeScript files

### 4. Logout
- Click the "Logout" button in the top right
- Your session will be securely terminated

## 🔧 Configuration

### Environment Variables
Located in `.env.local`:

```env
# Security
JWT_SECRET=your-generated-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-hashed-password

# Rate Limiting
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=900000

# Environment
NODE_ENV=development
```

### Changing Admin Password

1. **Option A: Use Setup Script**
   ```bash
   npm run setup-admin
   ```

2. **Option B: Manual Hash Generation**
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = await bcrypt.hash('your-new-password', 12);
   console.log(hash);
   ```
   Then update `ADMIN_PASSWORD_HASH` in `.env.local`

## 🏗️ Technical Architecture

### Backend (API Routes)
- **`/api/admin/auth/login`** - Secure authentication endpoint
- **`/api/admin/auth/logout`** - Session termination
- **`/api/admin/content`** - List available content files
- **`/api/admin/content/[id]`** - Get/update specific content files

### Frontend (Admin Interface)
- **`/admin`** - Main admin page with authentication flow
- **`AdminLogin`** - Secure login form with error handling
- **`AdminDashboard`** - Content file overview and navigation
- **`ContentEditor`** - Rich text editor with save/revert functionality

### Security Middleware
- **Authentication verification** on all protected routes
- **Rate limiting** to prevent abuse
- **Input validation** and sanitization
- **Error handling** with security in mind

## 📁 File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Main admin page
│   └── api/
│       └── admin/
│           ├── auth/
│           │   ├── login/route.ts    # Login endpoint
│           │   └── logout/route.ts   # Logout endpoint
│           └── content/
│               ├── route.ts          # List content files
│               └── [id]/route.ts     # Get/update content
├── components/
│   └── admin/
│       ├── AdminLogin.tsx        # Login component
│       ├── AdminDashboard.tsx    # Dashboard component
│       └── ContentEditor.tsx     # Editor component
└── lib/
    ├── auth.ts                   # Authentication utilities
    ├── auth-middleware.ts        # Route protection
    ├── rate-limiter.ts          # Rate limiting
    └── content-manager.ts        # Content file management
```

## 🔒 Security Considerations

### For Production Deployment

1. **Change Default Password**: Immediately change from `admin123!`
2. **HTTPS Only**: Ensure your site uses HTTPS in production
3. **Environment Variables**: Use secure environment variable management
4. **Regular Backups**: Implement automated backup strategies
5. **Access Logs**: Monitor admin access logs
6. **Security Updates**: Keep dependencies updated

### Access Control
- Only you should have admin credentials
- Consider using a VPN for additional security
- Regularly rotate JWT secrets and passwords
- Monitor for suspicious login attempts

## 🆘 Troubleshooting

### Common Issues

**Can't login**: 
- Check username/password in `.env.local`
- Verify JWT_SECRET is set
- Clear browser cookies and try again

**Rate limited**:
- Wait 15 minutes for rate limit reset
- Check `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW` settings

**Save errors**:
- Check file permissions
- Verify TypeScript syntax is valid
- Look for backup files if content was corrupted

**Session expired**:
- Sessions last 24 hours by default
- Simply login again to continue

### Support
If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check file permissions for the content files

## 🚀 Getting Started Checklist

- [ ] Run `npm run setup-admin`
- [ ] Start development server with `npm run dev`
- [ ] Login at `http://localhost:3000/admin`
- [ ] Change default password
- [ ] Test editing content files
- [ ] Verify backups are created
- [ ] Configure production environment variables for deployment

Your secure content management system is now ready to use! 🎉