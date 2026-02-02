# EduScan Setup Guide

This guide will walk you through setting up EduScan from scratch.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/eduscan?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
FREE_TRIAL_DAYS=24
```

### 3. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

1. Install PostgreSQL if not already installed
2. Create a database:
```sql
CREATE DATABASE eduscan;
```

3. Update your `.env` with the correct connection string

#### Option B: Docker PostgreSQL

```bash
docker run --name eduscan-postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=eduscan \
  -p 5432:5432 \
  -d postgres:14
```

### 4. Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init
```

### 5. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Database Management

### View Database in Prisma Studio

```bash
npx prisma studio
```

This opens a GUI at `http://localhost:5555` to view and edit your data.

### Reset Database

```bash
npx prisma migrate reset
```

### Create New Migration

```bash
npx prisma migrate dev --name your_migration_name
```

## Testing the Application

### 1. Sign Up for Trial

1. Go to `http://localhost:3000`
2. Click "Start Free Trial"
3. Fill in the organization and admin details
4. Check the console for admin credentials (in production, this would be emailed)

### 2. Login as Admin

1. Go to `http://localhost:3000/login`
2. Use the credentials from the previous step
3. You'll be redirected to the admin dashboard

### 3. Create Users

From the admin dashboard:
- Navigate to Users
- Click "Create New User"
- Create teachers, class reps, and students

### 4. Set Up Departments and Courses

1. Go to Departments
2. Create departments (e.g., Computer Science, Mathematics)
3. Add courses to each department

### 5. Create an Attendance Session

As a teacher:
1. Navigate to "My Sessions"
2. Click "Create Session"
3. Select course and attendance method
4. Generate QR code if needed

## Production Deployment

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="generate-a-strong-secret-key"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard

### Deploy to Docker

```bash
# Build image
docker build -t eduscan .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e JWT_SECRET="your-secret" \
  eduscan
```

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running:
```bash
# Linux/Mac
sudo service postgresql status

# Windows
pg_ctl status
```

2. Check connection string format:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

3. Test connection:
```bash
npx prisma db push
```

### Port Already in Use

If port 3000 is in use:
```bash
# Change port
PORT=3001 npm run dev
```

### Prisma Client Not Generated

```bash
npx prisma generate
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Email Configuration (Optional)

To send actual emails for trial signups, integrate with an email service:

### Using SendGrid

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Add to `.env`:
```env
SENDGRID_API_KEY="your-api-key"
FROM_EMAIL="noreply@yourdomain.com"
```

3. Update `src/app/api/trial/register/route.ts` to send emails

### Using AWS SES

1. Install AWS SDK:
```bash
npm install @aws-sdk/client-ses
```

2. Add to `.env`:
```env
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
```

## RFID Integration

To integrate RFID readers:

1. Set up RFID reader with HTTP API
2. Update `.env`:
```env
RFID_READER_URL="http://your-rfid-reader:8080"
```

3. Implement RFID webhook in `src/app/api/attendance/rfid/route.ts`

## Facial Recognition Integration

To integrate facial recognition:

1. Choose a service (AWS Rekognition, Azure Face API, or self-hosted)
2. Update `.env`:
```env
FACE_RECOGNITION_API_URL="http://localhost:5000"
FACE_RECOGNITION_API_KEY="your-api-key"
```

3. Implement face recognition in `src/app/api/attendance/face/route.ts`

## Development Tips

### Hot Reload

Next.js automatically reloads on file changes in development mode.

### TypeScript

The project uses TypeScript for type safety. Run type checking:
```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Format Code

Install Prettier:
```bash
npm install -D prettier
npx prettier --write .
```

## Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/eduscan/issues)
- Email: support@eduscan.com
- Documentation: https://docs.eduscan.com

## Next Steps

1. ✅ Complete basic setup
2. ✅ Create trial account
3. ✅ Explore admin dashboard
4. □ Create departments and courses
5. □ Add users
6. □ Create first attendance session
7. □ Configure RFID/Face recognition (optional)
8. □ Customize branding
9. □ Set up email notifications
10. □ Deploy to production

Happy scanning! 🚀
