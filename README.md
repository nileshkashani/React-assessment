# Assessment made under: FotoOwl
# 🖼️ ExploreImg — Realtime Gallery & Interaction Platform

ExploreImg is a modern realtime image gallery web application that allows users to browse curated images, react with emojis, and post live comments.  
It is built with **React**, **Firebase**, and modern state-management patterns, focusing on performance, realtime updates, and a clean user experience.

---

## 🚀 Features

### 🔐 Authentication
- Email & Password authentication
- Google OAuth login
- Firebase Authentication integration

### 🖼️ Image Gallery
- Dynamic image feed rendering
- Focus / Zoom view for selected images
- Lazy loading using `IntersectionObserver`
- Smooth UI transitions

### 😍 Reactions System
- Per-image emoji reactions
- Realtime reaction updates via Firestore listeners
- Centralized reaction state using **Zustand**

### 💬 Realtime Comments
- Live comment updates using Firestore subscriptions
- Comments scoped per image
- Timestamp formatting and realtime sync

### ⚡ Realtime Data Engine
- Custom `useRealtimeCollection` hook
- Firestore `onSnapshot` listeners
- Instant UI updates with minimal re-renders

### 🧠 State Management
- Global UI store using **Zustand**
- Focused image state management
- Reaction store with per-image caching
- Optimized selectors to prevent infinite render loops

### 🎨 UI / UX
- Tailwind CSS styling
- ShadCN UI components
- Fully responsive dashboard layout
- Hover cards, transitions, and micro-interactions

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS, ShadCN UI |
| State | Zustand |
| Backend | Firebase Firestore |
| Auth | Firebase Authentication |
| Realtime Engine | Firestore `onSnapshot` |
| Deployment |vercel |

---

## 🧱 Architecture Overview
```
src/
├── components/
│   ├── Gallery.jsx
│   ├── ReactionPanel.jsx
│   ├── CommentPanel.jsx
│   └── Dashboard.jsx
├── hooks/
│   └── useRealtimeCollection.js
├── store/
│   ├── uiStore.js
│   └── reactionStore.js
├── service/
│   └── firebase.js
└── pages/
    ├── Login.jsx
    └── Home.jsx
```

### Data Flow

```
Firestore → Realtime Listener → Custom Hook → Zustand Store → React Components
```

---

## 🧰 Prerequisites

Ensure the following tools are installed on your system:

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Git

Verify installation:

```bash
node -v
npm -v
git --version
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/exploreimg.git
cd exploreimg
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Firebase

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Start the development server

```bash
npm run dev
```

---

## 🔥 Key Concepts Implemented

- Realtime UI synchronization
- Subscription lifecycle management
- Global UI orchestration with Zustand
- Firestore data modeling per image
- High-performance render optimization
- Clean separation of concerns
