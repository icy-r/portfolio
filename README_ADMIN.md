# Admin Dashboard Setup

## Authentication (Magic Link - Passwordless)

The admin dashboard uses **passwordless email authentication** (magic links). No passwords needed!

### How It Works:
1. Enter your admin email address
2. Receive a magic link via email (or see it directly if email service not configured)
3. Click the link to sign in
4. Stay signed in for 7 days

### Setup Options:

#### Option 1: With Email Service (Recommended for Production)

Set these environment variables:
```env
# Email Service Configuration (Gmail example)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Admin Email (single email)
ADMIN_EMAIL=asath12882@gmail.com

# NextAuth Secret (generate a random string)
NEXTAUTH_SECRET=your-random-secret-key
```

**For Gmail:**
- Enable 2-factor authentication
- Generate an "App Password" at https://myaccount.google.com/apppasswords
- Use the app password as `EMAIL_SERVER_PASSWORD`

**Alternative Email Services:**
- **Resend** (recommended): Free tier, easy setup
- **SendGrid**: Free tier available
- **Mailgun**: Free tier available
- **AWS SES**: Pay-as-you-go

#### Option 2: Without Email Service (Development/Simple)

Set only these environment variables:
```env
ALLOWED_ADMIN_EMAILS=asath12882@gmail.com
NEXTAUTH_SECRET=your-random-secret-key
```

In this mode, the magic link will be displayed directly on the login page (dev mode only).

⚠️ **IMPORTANT**: 
- Only emails in `ALLOWED_ADMIN_EMAILS` can access the admin panel
- Change `NEXTAUTH_SECRET` to a random string in production
- For production, always use Option 1 with a proper email service

## Features

### Blog Management
- Create, edit, delete blog posts
- Publish/unpublish posts
- View all posts (published and drafts)

### Contact Management
- View all contact form submissions
- Mark messages as read/unread
- Delete submissions

## Access

- Admin Dashboard: `/admin`
- Login Page: `/admin/login`
- Blog Editor: `/admin/blogs/new` or `/admin/blogs/[id]`

## Data Storage

Blogs and contacts are stored in JSON files in the `/data` directory:
- `/data/blogs.json` - Blog posts
- `/data/contacts.json` - Contact submissions

These files are automatically created when you first use the admin panel.

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs (published only for public, all for admin)
- `GET /api/blogs?id=[id]` - Get specific blog
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs` - Update blog (admin only)
- `DELETE /api/blogs?id=[id]` - Delete blog (admin only)

### Contacts
- `GET /api/contacts` - Get all contacts (admin only)
- `POST /api/contacts` - Submit contact form (public)
- `PUT /api/contacts` - Mark as read (admin only)
- `DELETE /api/contacts?id=[id]` - Delete contact (admin only)

