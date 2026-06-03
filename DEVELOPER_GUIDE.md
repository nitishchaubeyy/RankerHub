# 🛠️ RankerHub Developer Environment Setup Guide

Welcome to the RankerHub developer documentation! This guide will help you set up the project locally on your machine, connect it to your own Firebase development environment, and start contributing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended)
- **Git**
- **Google/Firebase Account** (for local database testing)
- **GitHub Account** (to test OAuth login)

---

## 🚀 Step 1: Clone & Install Dependencies

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine:

```bash
git clone https://github.com/<your-username>/RankerHub.git
cd RankerHub
```

3. Install the required NPM packages:

```bash
npm install
```

---

## 🔥 Step 2: Firebase Project Provisioning

To prevent testing on the production database, create your own Firebase project for local development.

### Create a Firebase Project

1. Go to the Firebase Console.
2. Click **Add Project**.
3. Name it something like `rankerhub-dev`.
4. Complete the setup process.

### Set Up Firestore

1. Navigate to **Build → Firestore Database**.
2. Click **Create Database**.
3. Select **Start in Test Mode**.

### Configure Authentication

1. Navigate to **Build → Authentication**.
2. Click **Get Started**.
3. Enable the **GitHub** sign-in provider.

> **Note:** You will need to create a new OAuth App in your GitHub Developer Settings and paste the Client ID and Client Secret into Firebase Authentication.

### Create a Web App

1. Open **Project Settings** (⚙️ Gear Icon).
2. Under the **General** tab, scroll to **Your Apps**.
3. Click **Add App → Web App**.
4. Copy the generated Firebase configuration values.

---

## 🔑 Step 3: Environment Variables

Create a new file named `.env` in the root of your project directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ **Important:** Never commit your `.env` file. It is already included in `.gitignore`.

---

## 📦 Step 4: Firebase CLI & Database Setup

We need to deploy the required Firestore Security Rules and Indexes so leaderboard queries work correctly in your local development environment.

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Log In to Firebase

```bash
firebase login
```

### Link Your Firebase Project

Select your newly created `rankerhub-dev` project:

```bash
firebase use --add
```

### Deploy Firestore Rules and Indexes

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

> **Note:** Firestore index creation may take a few minutes to complete in the Firebase Console.

---

## 💻 Step 5: Run the Local Development Server

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173
```

You can now log in using GitHub authentication, which will automatically seed your first developer profile into your local Firestore database.

---

## 🤝 Contribution Workflow

### Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Development Process

1. Make your changes.
2. Test everything locally.
3. Commit your changes using the project's commit conventions:

```text
feat: add leaderboard filters
fix: resolve auth redirect issue
docs: update setup guide
```

### Submit Your Changes

1. Push your branch to your fork.
2. Open a Pull Request against the official RankerHub repository's `main` branch.

---

## 🎉 You're Ready!

Your local RankerHub development environment is now configured and ready for contribution.

Happy Coding! 🚀