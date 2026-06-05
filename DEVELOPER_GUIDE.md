# 🛠️ RankerHub Developer Environment Setup Guide

Welcome to the RankerHub developer documentation! This guide will help you set up the project locally on your machine, connect it to your own Firebase development environment, and start contributing.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended)
- **Git**
- **Google/Firebase Account** (for local database testing)
- **GitHub Account** (to test OAuth login)

---

## 🚀 Step 1: Clone and Install Dependencies

1. Fork the repository on GitHub.
2. Clone your forked repository:

```bash
git clone https://github.com/<your-username>/RankerHub.git
cd RankerHub
```

3. Install the required dependencies:

```bash
npm install
```

---

## 🔥 Step 2: Firebase Project Provisioning

To prevent testing against the production database, create your own Firebase project for local development.

### Create a Firebase Project

1. Open the Firebase Console.
2. Click **Add Project**.
3. Name it something like `rankerhub-dev`.
4. Complete the setup process.

### Configure Firestore

1. Navigate to **Build → Firestore Database**.
2. Click **Create Database**.
3. Select **Start in Test Mode**.

### Configure Authentication

1. Navigate to **Build → Authentication**.
2. Click **Get Started**.
3. Enable the **GitHub** sign-in provider.

> **Note:** You will need to create a GitHub OAuth App in GitHub Developer Settings and provide the generated Client ID and Client Secret.

### Create a Web App

1. Open **Project Settings** (⚙️ icon).
2. Under **General**, scroll down to **Your Apps**.
3. Click **Add App → Web App**.
4. Copy the Firebase configuration values.

---

## 🔑 Step 3: Environment Variables

Create a `.env` file in the project root and add your Firebase configuration:

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

## 📦 Step 4: Firebase CLI and Database Setup

Deploy the required Firestore Security Rules and Indexes so leaderboard queries function correctly.

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Authenticate with Firebase

```bash
firebase login
```

### Link Your Firebase Project

```bash
firebase use --add
```

Select your `rankerhub-dev` project when prompted.

### Deploy Firestore Rules and Indexes

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

> **Note:** Firestore index creation may take several minutes to complete.

---

## 🗄️ Step 5: Local Database Emulator Setup

To avoid working directly against a live database, use the Firestore Emulator.

### Start the Firestore Emulator

```bash
firebase emulators:start --only firestore
```

### Seed Development Data

Open a new terminal window and run:

```bash
npm run seed
```

This populates the emulator with mock user profiles and sample leaderboard data for local development.

---

## 💻 Step 6: Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:5173
```

You can now log in using GitHub authentication. Your first developer profile will be automatically created in the local Firestore emulator.

---

## 🤝 Contribution Workflow

### Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Develop and Test

- Make your changes.
- Test everything locally.
- Verify functionality using the Firestore emulator.

### Commit Changes

Use the project's commit conventions:

```text
feat: add leaderboard filtering
fix: resolve authentication redirect issue
docs: update setup instructions
```

### Submit Your Contribution

1. Push your branch to your fork.
2. Open a Pull Request against the main branch of the official RankerHub repository.
3. Wait for review and feedback.

---

## 🚀 Happy Coding!

Thanks for contributing to RankerHub. We appreciate your help in making the project better for everyone.
