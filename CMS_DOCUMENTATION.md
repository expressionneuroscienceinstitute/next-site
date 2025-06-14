# 🔐 Secure Content Management System

A secure, web-based content management system for your Expression Neuroscience Institute website at **https://expression.ngo**. This system allows you to edit all text content through a modern, secure web interface with live preview functionality and **WYSIWYG editing**.

## 🌐 Website Information

- **Live Website**: https://expression.ngo
- **Local Development**: http://localhost:3000
- **Admin Panel (Local)**: http://localhost:3000/admin
- **Admin Panel (Production)**: https://expression.ngo/admin

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
   - **Local**: `http://localhost:3000/admin`
   - **Production**: `https://expression.ngo/admin`
   
   **Default Credentials**:
   - Username: `admin`
   - Password: `admin123!`

## 🔄 Content Management Workflow

### Option A: Local Development → Deploy (Recommended)
1. **Edit Locally**: Use `http://localhost:3000/admin` to edit content
2. **Preview Changes**: Test how changes will look with the preview feature
3. **Commit & Deploy**: Push changes to trigger deployment to expression.ngo
4. **Go Live**: Changes automatically appear on https://expression.ngo

### Option B: Direct Production Editing
1. **Production Admin**: Login to `https://expression.ngo/admin`
2. **Edit Content**: Make changes directly on the live site
3. **Preview First**: Use preview to test before saving
4. **Save Changes**: Content immediately goes live on expression.ngo

### Option C: WYSIWYG Edit in Preview ✨ (New!)
1. **Open Editor**: Click "Edit in Preview" from any content editor
2. **Click to Edit**: Click on any text in the preview to edit it inline
3. **Real-time Changes**: See your edits instantly in the actual website layout
4. **Save When Ready**: Click "Save Changes" to make edits permanent

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
- **Live preview mode** - test changes before saving
- **WYSIWYG protection** - real-time validation during inline editing

### Security Headers & Best Practices
- **Secure cookies** in production with HTTPS
- **Environment variable protection** for sensitive data
- **Error handling** without information disclosure
- **Content type validation** to prevent injection attacks

## 📝 Editable Content

The CMS allows you to edit the following content files on expression.ngo:

| File | Description | Content | WYSIWYG Support |
|------|-------------|---------|-----------------|
| **About Page** | Mission, board members, future vision | Team bios, mission statement, organization goals | ✅ Full inline editing |
| **Roadmap** | Research timeline and program roadmap | Project timelines, milestones, research programs | ⚠️ Partial support |
| **Donate Page** | Donation page content and messaging | Call-to-action text, donation messaging | ✅ Full inline editing |
| **Research Page** | Research datasets and publications | Research listings, publication links | ⚠️ Basic support |
| **Document Links** | Footer document links and navigation | PDF links, governance documents | ⚠️ Basic support |

## 🎯 How to Use

### 1. Login
- **Local**: Navigate to `http://localhost:3000/admin`
- **Production**: Navigate to `https://expression.ngo/admin`
- Enter your credentials
- You'll be automatically redirected to the dashboard

### 2. Choose Your Editing Method

**Traditional Code Editor:**
- Click "Edit Content" on any content file
- Edit the raw configuration code
- Use "Preview" to see how changes look

**WYSIWYG Editor (Recommended):** ✨
- Click "Edit in Preview" on any content file
- Edit text directly in the website layout
- See changes instantly as you type

### 3. Preview Your Changes
- **Click "Preview"** to see how your changes will look on the live website
- Preview opens in a new tab showing the actual page layout
- Make further edits if needed
- **Preview doesn't affect the live site** - only saved changes go live

### 4. Edit in Preview Mode ✨ (New!)
- **Click "Edit in Preview"** for the ultimate editing experience
- **Visual Editing**: Click on any text to edit it inline
- **Real-time Updates**: See changes instantly in the actual website layout
- **Contextual Editing**: Edit headings, paragraphs, and content in place
- **Smart Controls**: Save/Cancel buttons appear when editing
- **Keyboard Shortcuts**: Enter to save, Escape to cancel

### 5. Save Changes
- Click "Save Changes" to apply your edits to the live website
- In WYSIWYG mode, click the "Save Changes" button in the header
- Only save when you're satisfied with the preview

### 6. Features
- **Real-time feedback**: See character/line counts and change indicators
- **Live preview**: Test changes safely before publishing
- **WYSIWYG editing**: Click-to-edit functionality with real-time updates ✨
- **Revert changes**: Undo modifications before saving
- **Automatic backups**: Previous versions are saved automatically
- **Syntax highlighting**: Code-friendly editor for TypeScript files

### 7. Logout
- Click the "Logout" button in the top right
- Your session will be securely terminated

## 🔧 Configuration

### Environment Variables
Located in `.env.local` for development:

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

For production (Vercel environment variables):
```env
# Same variables but without escaping $ characters
JWT_SECRET=your-generated-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-hashed-password
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=900000
NODE_ENV=production
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
   Then update `ADMIN_PASSWORD_HASH` in `.env.local` (local) or Vercel settings (production)

## 🏗️ Technical Architecture

### Backend (API Routes)
- **`/api/admin/auth/login`** - Secure authentication endpoint
- **`/api/admin/auth/logout`** - Session termination
- **`/api/admin/content`** - List available content files
- **`/api/admin/content/[id]`** - Get/update specific content files
- **`/api/admin/preview`** - Create and serve content previews
- **`/api/admin/preview/edit`** - Save content from WYSIWYG editor ✨

### Frontend (Admin Interface)
- **`/admin`** - Main admin page with authentication flow
- **`/preview`** - Live preview page for testing content changes
- **`/preview?edit=true`** - WYSIWYG editing mode ✨
- **`AdminLogin`** - Secure login form with error handling
- **`AdminDashboard`** - Content file overview and navigation
- **`ContentEditor`** - Rich text editor with preview and WYSIWYG functionality

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
│   ├── preview/
│   │   └── page.tsx              # Live preview + WYSIWYG editor ✨
│   └── api/
│       └── admin/
│           ├── auth/
│           │   ├── login/route.ts    # Login endpoint
│           │   └── logout/route.ts   # Logout endpoint
│           ├── content/
│           │   ├── route.ts          # List content files
│           │   └── [id]/route.ts     # Get/update content
│           ├── preview/
│           │   ├── route.ts          # Preview API
│           │   └── edit/route.ts     # WYSIWYG save API ✨
├── components/
│   └── admin/
│       ├── AdminLogin.tsx        # Login component
│       ├── AdminDashboard.tsx    # Dashboard component
│       └── ContentEditor.tsx     # Editor with preview + WYSIWYG ✨
└── lib/
    ├── auth.ts                   # Authentication utilities
    ├── auth-middleware.ts        # Route protection
    ├── rate-limiter.ts          # Rate limiting
    └── content-manager.ts        # Content file management
```

## 🔒 Security Considerations

### For Production Deployment (expression.ngo)

1. **Change Default Password**: Immediately change from `admin123!`
2. **HTTPS Only**: Vercel automatically provides HTTPS for expression.ngo
3. **Environment Variables**: Use secure environment variable management in Vercel
4. **Regular Backups**: Implement automated backup strategies
5. **Access Logs**: Monitor admin access logs
6. **Security Updates**: Keep dependencies updated

### Access Control
- Only you should have admin credentials
- Consider using a VPN for additional security
- Regularly rotate JWT secrets and passwords
- Monitor for suspicious login attempts to /admin

## 🆘 Troubleshooting

### Common Issues

**Can't login to expression.ngo/admin**: 
- Check username/password in Vercel environment variables
- Verify JWT_SECRET is set in Vercel
- Ensure password hash is NOT escaped in Vercel settings

**Can't login locally**:
- Check username/password in `.env.local`
- Verify JWT_SECRET is set
- Clear browser cookies and try again

**Rate limited**:
- Wait 15 minutes for rate limit reset
- Check `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW` settings

**Preview not working**:
- Check that content syntax is valid TypeScript
- Ensure you're logged in when creating previews
- Preview links expire after 30 minutes

**WYSIWYG editor issues**: ✨
- Ensure you're logged in when using edit mode
- Check browser console for JavaScript errors
- Try refreshing the preview if editing stops working
- Changes are auto-validated in real-time

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
- [ ] **Try the preview feature**
- [ ] **Try the WYSIWYG "Edit in Preview" mode** ✨
- [ ] Verify backups are created
- [ ] Configure production environment variables for Vercel deployment
- [ ] Deploy to expression.ngo and test production admin

## ✨ Preview & WYSIWYG Features

### Traditional Preview
- **Safe Testing**: See exactly how your changes will look before publishing
- **Real Layout**: Preview shows the actual website design and styling
- **No Risk**: Preview doesn't affect your live website at expression.ngo

### WYSIWYG Edit in Preview (New!) ✨
The revolutionary **click-to-edit preview system** allows you to:

1. **Visual Editing**: Edit content directly in the website layout
2. **Click to Edit**: Simply click on any text to start editing
3. **Real-time Updates**: See changes instantly as you type
4. **Context Aware**: Edit headings, paragraphs, and content in place
5. **Smart Validation**: Content is validated in real-time
6. **Easy Workflow**: Click text → Edit → Save → Done!

**Perfect for:**
- Quick content updates
- Seeing exactly how text fits in the design
- Non-technical content editing
- Real-time content experimentation

**How it works:**
- Click "Edit in Preview" from any content editor
- Click on any text in the preview to edit it
- Edit inline with smart save/cancel controls
- See changes instantly in the real website layout
- Click "Save Changes" when satisfied

**Available both locally and on production:**
- Local development: Perfect for testing and development
- Production admin: Direct content editing on expression.ngo

Your secure content management system now offers **three powerful editing modes** for managing content on **https://expression.ngo**:

1. **Code Editor**: Raw configuration editing for advanced users
2. **Preview Mode**: Safe testing before publishing
3. **WYSIWYG Editor**: Visual click-to-edit experience ✨

Choose the method that works best for your workflow! 🎉