#!/bin/bash

echo "========================================"
echo " EduScan - Attendance Tracking System"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[1/4] Installing dependencies..."
    npm install
    echo ""
else
    echo "[1/4] Dependencies already installed."
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "[2/4] Creating .env file..."
    cp .env.example .env
    echo "Please update the .env file with your database credentials."
    echo ""
    read -p "Press enter to continue..."
else
    echo "[2/4] Environment file exists."
    echo ""
fi

# Generate Prisma Client
echo "[3/4] Generating Prisma Client..."
npx prisma generate
echo ""

# Start the development server
echo "[4/4] Starting development server..."
echo ""
echo "========================================"
echo " EduScan is running!"
echo " Open http://localhost:3000 in your browser"
echo "========================================"
echo ""
npm run dev
