# 🚀 Getting Started with EduScan

Welcome to EduScan! This guide will get you up and running in minutes.

## ⚡ Quick Start (Easiest Way)

### Windows
1. Double-click `start.bat`
2. Follow the prompts
3. Open http://localhost:3000

### Linux/Mac
```bash
chmod +x start.sh
./start.sh
```

That's it! The script handles everything automatically.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js 18 or higher ([Download](https://nodejs.org/))
- ✅ PostgreSQL 14 or higher ([Download](https://www.postgresql.org/download/))
- ✅ Git (optional, for version control)

### Check Your Versions
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
psql --version  # Should be 14.0 or higher
```

## 🗄️ Database Setup

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL** if not already installed

2. **Create Database**
   ```bash
   # Open PostgreSQL command line
   psql -U postgres

   # Create database
   CREATE DATABASE eduscan;

   # Exit
   \q
   ```

3. **Update .env file**
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/eduscan?schema=public"
   ```
   Replace `your_password` with your PostgreSQL password.

### Option 2: Docker PostgreSQL (Easiest)

```bash
docker run --name eduscan-postgres \
  -e POSTGRES_PASSWORD=eduscan123 \
  -e POSTGRES_DB=eduscan \
  -p 5432:5432 \
  -d postgres:14
```

Then update `.env`:
```env
DATABASE_URL="postgresql://postgres:eduscan123@localhost:5432/eduscan?schema=public"
```

### Option 3: Cloud Database (Production)

Use services like:
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app) (Easy PostgreSQL hosting)
- [Neon](https://neon.tech) (Serverless PostgreSQL)
- [AWS RDS](https://aws.amazon.com/rds/)

Get your connection string and update `.env`.

## 📦 Installation

### Step 1: Install Dependencies
```bash
npm install
```

This installs all required packages (~5 minutes first time).

### Step 2: Set Up Environment
```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` with your settings:
```env
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/eduscan"
JWT_SECRET="your-super-secret-key-minimum-32-characters"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional
FREE_TRIAL_DAYS=24
RFID_READER_URL="http://localhost:8080"
FACE_RECOGNITION_API_URL="http://localhost:5000"
```

### Step 3: Generate Prisma Client
```bash
npx prisma generate
```

### Step 4: Run Database Migrations
```bash
npx prisma migrate dev --name init
```

This creates all database tables.

### Step 5: Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000 - you should see the landing page! 🎉

## 🎯 First-Time Setup

### 1. Start Your Free Trial

1. Open http://localhost:3000
2. Click "Start Free Trial"
3. Fill in organization details:
   - Organization name (e.g., "Springfield University")
   - Type (Educational or Enterprise)
   - Contact information
4. Fill in admin details:
   - First & last name
   - Admin email
5. Click "Start Your 24-Day Free Trial"

### 2. Get Your Admin Credentials

**Important**: Check the terminal/console where the server is running.

You'll see output like:
```
Admin Credentials: {
  email: 'admin@organization.com',
  password: 'Xy9#mK2pL4nQ',
  trialEndDate: '2026-02-26T...'
}
```

**Save these credentials!** In production, these would be emailed.

### 3. Log In

1. Go to http://localhost:3000/login
2. Enter your admin email and password
3. Click "Sign In"
4. You'll be redirected to the admin dashboard 🎊

## 🎨 Explore the Dashboard

### Admin Dashboard Features:
- 📊 Real-time statistics
- 📈 Weekly attendance charts
- 👥 User breakdown
- 📅 Recent sessions
- ⚡ Quick actions

### Try These:
1. View the statistics cards
2. Explore the charts
3. Check recent sessions
4. Try the quick action buttons (placeholders for now)

## 🛠️ Development Tools

### View Database
```bash
npx prisma studio
```
Opens a GUI at http://localhost:5555 to view/edit data.

### Check Types
```bash
npx tsc --noEmit
```

### Lint Code
```bash
npm run lint
```

## 🚧 Common Issues & Solutions

### Issue: Port 3000 Already in Use
**Solution:**
```bash
# Use different port
PORT=3001 npm run dev
```

### Issue: Database Connection Failed
**Solutions:**
1. Check PostgreSQL is running:
   ```bash
   # Windows (Services)
   # Mac
   brew services list
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify connection string in `.env`

3. Test connection:
   ```bash
   npx prisma db push
   ```

### Issue: Module Not Found
**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Prisma Client Not Generated
**Solution:**
```bash
npx prisma generate
```

## 📚 Next Steps

### For Development:
1. ✅ Complete setup (you're here!)
2. 📖 Read [README.md](./README.md) for full documentation
3. 🎯 Check [FEATURES.md](./FEATURES.md) for all features
4. 🔧 Follow [SETUP.md](./SETUP.md) for advanced config

### To Build Features:
1. Implement user management
2. Create Teacher Dashboard
3. Build Class Rep Dashboard
4. Add QR code generation
5. Implement attendance marking

### To Deploy:
1. Build production version: `npm run build`
2. Test production: `npm start`
3. Deploy to Vercel: `vercel --prod`
4. Or use Docker: See [SETUP.md](./SETUP.md)

## 🎓 Learning Resources

### Project Documentation:
- **README.md** - Main documentation
- **SETUP.md** - Detailed setup guide
- **FEATURES.md** - Complete feature list
- **PROJECT_SUMMARY.md** - What's been built

### External Resources:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Tips & Best Practices

### Development:
- 🔥 Use hot reload - changes appear instantly
- 🎨 Customize colors in `tailwind.config.js`
- 🔍 Use Prisma Studio to inspect data
- 📝 Keep `.env` secrets safe (never commit!)

### Database:
- 💾 Run migrations after schema changes
- 🔄 Use `prisma migrate dev` in development
- 📊 Check data in Prisma Studio
- 🔒 Backup regularly in production

### Security:
- 🔑 Change JWT_SECRET in production
- 🔐 Use strong database passwords
- 🚫 Never commit `.env` file
- ✅ Keep dependencies updated

## 🎉 Congratulations!

You've successfully set up EduScan! Here's what you can do now:

1. ✅ Explore the landing page
2. ✅ Sign up for trial
3. ✅ Log in as admin
4. ✅ View dashboard analytics
5. 🚀 Start building features!

## 📞 Need Help?

- 📧 Email: support@eduscan.com
- 📖 Documentation: Check the docs folder
- 🐛 Issues: Create GitHub issue
- 💬 Community: Join our forum (coming soon)

## 🎯 Quick Reference

### Useful Commands:
```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production
npm start

# View database
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Check types
npx tsc --noEmit

# Lint code
npm run lint
```

### Important URLs:
- Landing Page: http://localhost:3000
- Trial Signup: http://localhost:3000/trial
- Login: http://localhost:3000/login
- Admin Dashboard: http://localhost:3000/dashboard/admin
- Prisma Studio: http://localhost:5555

### Important Files:
- Environment: `.env`
- Database Schema: `prisma/schema.prisma`
- Landing Page: `src/app/page.tsx`
- Admin Dashboard: `src/app/dashboard/admin/page.tsx`
- API Routes: `src/app/api/`

---

**Happy coding! 🚀 Let's revolutionize attendance tracking together!**

Need help? Check [SETUP.md](./SETUP.md) or [README.md](./README.md) for more details.
