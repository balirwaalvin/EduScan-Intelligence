# EduScan - Advanced Attendance Tracking System

![EduScan Logo](https://via.placeholder.com/800x200/0284c7/ffffff?text=EduScan+-+Revolutionary+Attendance+Tracking)

EduScan is a cutting-edge attendance management system that leverages **QR Code**, **RFID**, and **Facial Recognition** technology to streamline attendance tracking for educational institutions and enterprise organizations.

## 🚀 Key Features

### Triple Technology Integration
- **QR Code Scanning** - Fast and contactless attendance marking
- **RFID Tags** - Automated check-ins with RFID cards
- **Facial Recognition** - AI-powered biometric attendance

### Multi-Dashboard System
- **Admin Dashboard** - Complete system control and user management
- **Teacher Dashboard** - Session creation and attendance tracking
- **Class Representative Dashboard** - Assist with attendance management

### Premium Features
- ✅ Real-time attendance tracking
- ✅ Advanced analytics and reporting
- ✅ Role-based access control
- ✅ Multi-institution support
- ✅ Automated report generation
- ✅ Mobile-responsive design
- ✅ 24-day free trial (no credit card required)
- ✅ Enterprise-grade security

## 🏗️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Icons**: Lucide React
- **Charts**: Recharts
- **QR Code**: QRCode.js, HTML5-QRCode

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/eduscan.git
cd eduscan
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/eduscan?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
FREE_TRIAL_DAYS=24
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### Core Models

#### Organization
- Manages institution details
- Tracks subscription status (TRIAL, ACTIVE, EXPIRED)
- Supports both educational and enterprise types

#### User
- Role-based access (ADMIN, TEACHER, CLASS_REP, STUDENT)
- Supports RFID tags and facial recognition data
- Links to organization and department

#### Session
- Attendance sessions created by teachers/class reps
- Supports multiple attendance methods
- Auto-closing and late threshold features

#### AttendanceRecord
- Individual attendance records
- Links sessions with users
- Tracks method used and timestamp

## 🎯 Usage Guide

### For Administrators

1. **Initial Setup**
   - Start your 24-day free trial at `/trial`
   - Receive admin credentials via email
   - Log in to the admin dashboard

2. **Create Departments & Courses**
   - Navigate to Departments section
   - Add courses to each department

3. **Manage Users**
   - Create teacher accounts
   - Create class representative accounts
   - Import student data (bulk upload supported)

4. **Configure Attendance Methods**
   - Enable/disable QR Code, RFID, or Facial Recognition
   - Configure RFID reader endpoints
   - Set up facial recognition API

### For Teachers

1. **Create Sessions**
   - Select course and time slot
   - Choose attendance method(s)
   - Generate QR code if applicable

2. **Monitor Attendance**
   - Real-time attendance tracking
   - Mark late arrivals
   - Add notes for absences

3. **Generate Reports**
   - Export attendance data
   - View analytics and trends
   - Schedule automated reports

### For Class Representatives

1. **Assist with Sessions**
   - Help manage attendance sessions
   - Support students with check-in issues
   - Report technical problems

2. **View Statistics**
   - Monitor class attendance rates
   - Identify patterns

## 📊 Dashboard Features

### Admin Dashboard
- User management (create, edit, deactivate)
- Organization settings
- Subscription management
- System-wide analytics
- Department & course management
- Bulk operations

### Teacher Dashboard
- Session creation and management
- Real-time attendance monitoring
- Student performance tracking
- Report generation
- Course management

### Class Rep Dashboard
- Session assistance
- Attendance monitoring
- Student support
- Limited reporting

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt encryption
- **Role-Based Access Control** - Granular permissions
- **Admin-Only User Creation** - No public signups
- **Session Expiry** - Auto-logout after inactivity
- **HTTPS Enforcement** - Secure data transmission

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/trial/register` - Trial registration

### User Management (Admin)
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user

### Sessions
- `GET /api/sessions` - List sessions
- `POST /api/sessions` - Create session
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Close session

### Attendance
- `POST /api/attendance/mark` - Mark attendance
- `GET /api/attendance/session/:id` - Get session attendance
- `GET /api/attendance/user/:id` - Get user attendance history

## 🎨 Customization

### Branding
Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  primary: {
    // Your brand colors
  },
}
```

### Features
Enable/disable features in `src/lib/config.ts`:
```typescript
export const features = {
  qrCode: true,
  rfid: true,
  facialRecognition: true,
}
```

## 📱 Mobile Support

EduScan is fully responsive and works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices (iOS & Android)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Quick Deploy to DigitalOcean (Recommended) ⭐

**Why DigitalOcean for QR Code System?**
- ✅ Public URL accessible from any device
- ✅ QR codes work on all mobile devices
- ✅ Automatic HTTPS/SSL
- ✅ Easy GitHub integration
- ✅ Auto-deploy on push

**Quick Start** (5 minutes):
1. Push code to GitHub
2. Create app on DigitalOcean App Platform
3. Connect GitHub repository
4. Add environment variables
5. Deploy!

📖 **Full Guide**: See [QUICK_DEPLOY_GUIDE.md](QUICK_DEPLOY_GUIDE.md)

📋 **Detailed Documentation**: See [DIGITALOCEAN_DEPLOYMENT.md](DIGITALOCEAN_DEPLOYMENT.md)

✅ **Checklist**: Use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

### Other Deployment Options

#### Production Build
```bash
npm run build
npm start
```

#### Deploy with Docker
```bash
# Build image
docker build -t eduscan:latest .

# Run container
docker run -d -p 3000:3000 --env-file .env.production eduscan:latest
```

#### Deploy to Vercel
```bash
vercel --prod
```

### Environment Variables for Production

Copy `.env.production.example` to `.env.production` and fill in:
- `NEXT_PUBLIC_APP_URL` - Your production URL
- `NEXT_PUBLIC_APPWRITE_*` - Your Appwrite credentials
- `JWT_SECRET` - Strong secret for JWT tokens

## 📈 Roadmap

- [x] QR Code attendance system with live dashboard ✅
- [x] In-app QR code generation ✅
- [x] Real-time attendance tracking ✅
- [x] Admin dashboard with analytics ✅
- [x] Department and course management ✅
- [x] User management system ✅
- [x] Organization settings ✅
- [ ] Mobile apps (iOS & Android)
- [ ] Advanced facial recognition with liveness detection
- [ ] Geofencing for location-based attendance
- [ ] Integration with popular LMS platforms
- [ ] AI-powered attendance predictions
- [ ] Multi-language support
- [ ] WebSocket for real-time updates
- [ ] Advanced analytics with ML insights
- [ ] Attendance reports export (CSV/PDF)
- [ ] Email notifications

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for details.

## 💬 Support

- **Email**: support@eduscan.com
- **Documentation**: See our comprehensive guides:
  - [Getting Started](GETTING_STARTED.md)
  - [QR Attendance Setup](QR_ATTENDANCE_COMPLETE_SETUP.md)
  - [Deployment Guide](DIGITALOCEAN_DEPLOYMENT.md)
- **Issue Tracker**: https://github.com/yourusername/eduscan/issues

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI inspiration from [Tailwind UI](https://tailwindui.com)
- Animation library [Framer Motion](https://www.framer.com/motion/)
- Backend by [Appwrite](https://appwrite.io)

---

Made with ❤️ by the EduScan Team

**Start your 24-day free trial today!** 🚀
