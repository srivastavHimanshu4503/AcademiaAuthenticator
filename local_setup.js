import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get current directory in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to create directories recursively
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper to write files
function writeFile(filePath, content) {
  const fullPath = path.join(__dirname, filePath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim());
  console.log(`Created: ${filePath}`);
}

// --- CONFIGURATION FILES ---

const packageJson = {
  "name": "satyacert-gov",
  "private": true,
  "version": "4.2.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.12.2",
    "firebase": "^10.8.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.3",
    "vite": "^5.4.1"
  }
};

const tsConfig = {
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
};

const tsConfigApp = {
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
};

const tsConfigNode = {
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
};

const viteConfig = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;

const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          blue: '#1e3a8a', // Official Deep Blue
          light: '#eff6ff',
          orange: '#f97316',
          green: '#15803d',
          dark: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
`;

const postCssConfig = `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

const indexHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SatyaCert | National Certificate Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const indexCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}

h1, h2, h3, h4 {
  font-family: 'Merriweather', serif;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}

.parallax-bg {
  background-image: url('https://picsum.photos/1920/1080?grayscale');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
`;

// --- SOURCE CODE ---

const firebaseConfigTs = `
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace with your actual config if needed
const firebaseConfig = {
  apiKey: "AIzaSyAkBmS0uKNdejThlsxCNyoDhsQn0THpN4k",
  authDomain: "satyacert-22c26.firebaseapp.com",
  projectId: "satyacert-22c26",
  storageBucket: "satyacert-22c26.firebasestorage.app",
  messagingSenderId: "827819345422",
  appId: "1:827819345422:web:040139f06266b7d3135e5f",
  measurementId: "G-NQMJ9H5G42"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
`;

const mainTsx = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;

const typesTs = `
export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN',
  INSTITUTION = 'INSTITUTION'
}

export interface VerificationRequest {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  submittedAt: any;
  type: 'DOCUMENT' | 'MANUAL';
  fileName?: string;
  details?: any;
  result?: any;
}

export interface VerificationLog {
  id: string;
  candidateName: string;
  certificateId: string;
  institution: string;
  status: 'VERIFIED' | 'FAKE' | 'SUSPICIOUS';
  date: string;
  details: string;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  region: string;
  contactEmail: string;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  password?: string;
}

export interface StatData {
  name: string;
  value: number;
  color?: string;
}

export enum VerificationStep {
  UPLOAD = 0,
  PREVIEW = 1,
  PROCESSING = 2,
  RESULT = 3,
  HANDOVER = 4
}
`;

const constantsTs = `
import { StatData } from './types';

export const MONTHLY_STATS: StatData[] = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export const STATUS_STATS: StatData[] = [
  { name: 'Verified', value: 75, color: '#15803d' },
  { name: 'Fake', value: 15, color: '#ef4444' },
  { name: 'Suspicious', value: 10, color: '#f59e0b' },
];
`;

const apiTs = `
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  getDoc,
  setDoc,
  Timestamp,
  writeBatch,
  orderBy
} from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";
import { db, auth, googleProvider } from '../firebaseConfig';
import { UserRole, Institution, VerificationRequest } from '../types';
import { MONTHLY_STATS } from '../constants';

export const api = {
  
  // --- AUTHENTICATION ---

  loginGoogle: async () => {
    try {
      const result = await firebaseAuth.signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Create/Update user record
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        role: UserRole.USER,
        lastLogin: Timestamp.now()
      }, { merge: true });

      return {
        name: user.displayName || 'User',
        email: user.email,
        role: UserRole.USER,
        token: await user.getIdToken(),
        avatar: user.photoURL,
        uid: user.uid
      };
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw error;
    }
  },

  loginAdmin: async (email: string, pass: string) => {
    try {
      const result = await firebaseAuth.signInWithEmailAndPassword(auth, email, pass);
      return { 
        name: 'Administrator', 
        email: result.user.email,
        role: UserRole.ADMIN, 
        token: await result.user.getIdToken(),
        uid: result.user.uid
      };
    } catch (error: any) {
      throw new Error(error.message || 'Invalid Admin Credentials');
    }
  },

  loginInstitution: async (email: string, pass: string) => {
    try {
      const result = await firebaseAuth.signInWithEmailAndPassword(auth, email, pass);
      
      const q = query(collection(db, "institutions"), where("contactEmail", "==", email));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) throw new Error('Institution record not found in registry.');
      
      const instData = snapshot.docs[0].data() as Institution;
      
      if (instData.status === 'PENDING') throw new Error('Account pending approval by Higher Ed. Dept.');
      if (instData.status === 'REJECTED') throw new Error('Account request rejected.');

      return { 
        name: instData.name, 
        role: UserRole.INSTITUTION, 
        id: snapshot.docs[0].id, 
        token: await result.user.getIdToken(),
        uid: result.user.uid
      };
    } catch (error: any) {
      throw new Error(error.message || 'Login Failed');
    }
  },

  logout: async () => {
    await firebaseAuth.signOut(auth);
  },

  // --- INSTITUTION FLOW ---

  registerInstitution: async (data: any) => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, data.contactEmail, data.password);
      
      const newInst = {
        name: data.name,
        code: data.code,
        region: data.region,
        contactEmail: data.contactEmail,
        status: 'PENDING',
        uid: userCredential.user.uid,
        createdAt: Timestamp.now()
      };
      
      await addDoc(collection(db, "institutions"), newInst);
      await firebaseAuth.signOut(auth); 
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAllInstitutions: async () => {
    const snapshot = await getDocs(collection(db, "institutions"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Institution[];
  },

  updateInstitutionStatus: async (id: string, status: 'ACTIVE' | 'REJECTED') => {
    const instRef = doc(db, "institutions", id);
    await updateDoc(instRef, { status: status });
    return true;
  },

  // --- BULK DATA (Frontend -> Backend Storage) ---

  uploadBulkData: async (file: File, institutionId: string) => {
    // Simulate CSV parsing and storage
    return new Promise((resolve) => {
      setTimeout(async () => {
        // Create a dummy certificate entry to prove DB write
        await addDoc(collection(db, "certificates"), {
          certificateId: \`DEMO-\${Math.floor(Math.random() * 10000)}\`,
          candidateName: "BATCH UPLOAD STUDENT",
          institutionId: institutionId,
          course: "Uploaded Course",
          year: "2024",
          createdAt: Timestamp.now()
        });
        resolve({ success: true, recordsProcessed: 150 });
      }, 1500);
    });
  },

  // --- VERIFICATION QUEUE (HANDOVER LOGIC) ---

  // 1. Submit Document for Backend Processing
  submitVerificationRequest: async (file: File, userId: string) => {
    // In prod: Upload to Storage, get URL. Here we store filename.
    const docRef = await addDoc(collection(db, "verification_queue"), {
      userId,
      fileName: file.name,
      status: 'PENDING',
      type: 'DOCUMENT',
      submittedAt: Timestamp.now()
    });
    return { requestId: docRef.id };
  },

  // 2. Submit Manual Details for Backend Processing
  submitManualRequest: async (details: any, userId: string) => {
    const docRef = await addDoc(collection(db, "verification_queue"), {
      userId,
      details,
      status: 'PENDING',
      type: 'MANUAL',
      submittedAt: Timestamp.now()
    });
    return { requestId: docRef.id };
  },

  // 3. Get User's Requests
  getUserRequests: async (userId: string) => {
    if (!userId) return [];
    // Need composite index for where+orderBy, fallback to simple query if fails
    try {
      const q = query(
        collection(db, "verification_queue"), 
        where("userId", "==", userId),
        orderBy("submittedAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          submittedAt: data.submittedAt?.toDate ? data.submittedAt.toDate().toLocaleString() : ''
        } as VerificationRequest;
      });
    } catch (e) {
      // Fallback if index is missing
      const q = query(collection(db, "verification_queue"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VerificationRequest));
    }
  },

  getAdminStats: async () => {
    return MONTHLY_STATS;
  }
};
`;

const navbarTsx = `
import React, { useState } from 'react';
import { Menu, User, LogOut, ShieldCheck, UserCircle, X, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentUser: string | null;
  role: string | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentUser, role, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    if (role === 'ADMIN') onNavigate('admin-dashboard');
    else if (role === 'INSTITUTION') onNavigate('institution-dashboard');
    else onNavigate('user-dashboard');
  };

  return (
    <nav className="bg-gov-blue shadow-lg sticky top-0 z-50">
      <div className="bg-blue-900 text-blue-100 text-[10px] md:text-xs py-1 px-4 flex justify-between items-center border-b border-blue-800">
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Government of Jharkhand</span>
          <span className="hidden md:inline border-l border-blue-700 pl-4 hover:underline cursor-pointer">Department of Higher Education</span>
        </div>
        <div className="space-x-3 flex items-center">
          <button className="hover:text-white transition-colors">Skip to Main Content</button>
          <span className="text-gray-500">|</span>
          <button className="hover:text-white transition-colors font-bold">A+</button>
          <button className="hover:text-white transition-colors">A</button>
          <button className="hover:text-white transition-colors text-xs">A-</button>
          <span className="text-gray-500">|</span>
          <button className="flex items-center gap-1 hover:text-white"><span>English</span></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('landing')}>
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-full">
                <ShieldCheck className="h-8 w-8 text-gov-blue" />
              </div>
              <div className="flex flex-col text-white">
                <h1 className="text-2xl font-bold font-serif leading-none tracking-tight group-hover:text-blue-200 transition-colors">SatyaCert</h1>
                <span className="text-[10px] text-blue-200 font-medium uppercase tracking-widest mt-0.5">National Credential Verification</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('landing')} className="text-white hover:text-gov-orange font-medium transition-colors text-sm uppercase tracking-wide">Home</button>
            <button className="text-white hover:text-gov-orange font-medium transition-colors text-sm uppercase tracking-wide">About</button>
            
            {currentUser && (
              <button 
                onClick={handleDashboardClick}
                className="text-gov-orange hover:text-white font-bold transition-colors text-sm uppercase tracking-wide flex items-center gap-1 border-b-2 border-gov-orange pb-0.5"
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
            )}
            
            {!currentUser ? (
              <button onClick={() => onNavigate('login')} className="bg-white text-gov-blue px-5 py-2 rounded shadow hover:bg-gray-100 transition-colors font-bold text-sm flex items-center gap-2">
                <User size={16} /> LOGIN
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end text-white">
                  <div className="text-sm font-bold leading-tight">{currentUser}</div>
                  <div className="text-[10px] bg-gov-orange px-1.5 rounded text-white font-bold uppercase">{role}</div>
                </div>
                <div className="flex items-center bg-blue-800 rounded-lg p-1 border border-blue-700">
                  <button onClick={() => onNavigate('profile')} className="p-2 text-blue-200 hover:text-white hover:bg-blue-700 rounded transition-colors" title="My Profile"><UserCircle size={20} /></button>
                  <div className="w-px h-4 bg-blue-700 mx-1"></div>
                  <button onClick={onLogout} className="p-2 text-blue-200 hover:text-red-300 hover:bg-blue-700 rounded transition-colors" title="Logout"><LogOut size={20} /></button>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-gov-orange p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-800">
          <button onClick={() => { onNavigate('landing'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Home</button>
          {currentUser && (
             <button onClick={() => { handleDashboardClick(); setIsMobileMenuOpen(false); }} className="text-gov-orange hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-bold w-full text-left">Dashboard</button>
          )}
          {!currentUser ? (
            <button onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Login</button>
          ) : (
             <>
               <button onClick={() => { onNavigate('profile'); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">My Profile</button>
               <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="text-red-300 hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Logout</button>
             </>
          )}
        </div>
      )}
    </nav>
  );
};
`;

const footerTsx = `
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gov-dark text-white border-t-4 border-gov-orange">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-serif font-bold mb-4 text-gov-light">SatyaCert</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              An initiative to securely verify academic credentials using advanced OCR and blockchain technology. Ensuring transparency and trust in education.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gov-orange transition-colors">Verify Certificate</a></li>
              <li><a href="#" className="hover:text-gov-orange transition-colors">Institution Login</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gov-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gov-orange transition-colors">Terms of Use</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Contact</h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Department of Higher Education</strong><br/>
              Ranchi, Jharkhand - 834004
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-xs text-gray-400">&copy; ${new Date().getFullYear()} SatyaCert. Content owned by Department of Higher Education.</p>
        </div>
      </div>
    </footer>
  );
};
`;

const landingPageTsx = `
import React from 'react';
import { Shield, Search, Upload, Database } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden parallax-bg bg-slate-900">
        <div className="absolute inset-0 bg-blue-900/80 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 inline-block p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <span className="text-gov-orange font-bold tracking-widest uppercase text-sm">Official Verification Portal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight drop-shadow-lg">
            Trusted Credentials <br/> Verified Instantly
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Secure, Tamper-Proof, and Centralized Verification for Educational Certificates.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('login')} className="bg-gov-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl text-lg flex items-center justify-center gap-2">
              <Upload size={24} /> Verify Certificate
            </button>
            <button onClick={() => onNavigate('login')} className="bg-white hover:bg-gray-50 text-gov-blue font-bold py-4 px-8 rounded shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl text-lg flex items-center justify-center gap-2">
              <Shield size={24} /> Institution Portal
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Ticker */}
      <div className="bg-gov-blue py-6 border-b-4 border-gov-orange">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around text-white text-center">
          <div className="p-2"><div className="text-3xl font-bold font-serif">Secure</div><div className="text-xs uppercase tracking-wider opacity-80">Encryption Standard</div></div>
          <div className="p-2"><div className="text-3xl font-bold font-serif">2.5M+</div><div className="text-xs uppercase tracking-wider opacity-80">Records Secured</div></div>
          <div className="p-2"><div className="text-3xl font-bold font-serif">100%</div><div className="text-xs uppercase tracking-wider opacity-80">Government Backed</div></div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gov-blue font-serif mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-gov-orange mx-auto rounded"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Seamless integration for users and institutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center group hover:border-gov-blue transition-colors">
              <div className="w-16 h-16 bg-blue-100 text-gov-blue rounded-full flex items-center justify-center mx-auto mb-6"><Upload size={32} /></div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">1. Upload Document</h3>
              <p className="text-gray-600 text-sm">Citizens upload their certificates securely for analysis.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center group hover:border-gov-blue transition-colors">
              <div className="w-16 h-16 bg-blue-100 text-gov-blue rounded-full flex items-center justify-center mx-auto mb-6"><Search size={32} /></div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">2. Processing</h3>
              <p className="text-gray-600 text-sm">Requests are queued and sent to our secure backend for verification.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center group hover:border-gov-blue transition-colors">
              <div className="w-16 h-16 bg-blue-100 text-gov-blue rounded-full flex items-center justify-center mx-auto mb-6"><Database size={32} /></div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">3. Database Match</h3>
              <p className="text-gray-600 text-sm">Data is cross-referenced with institution records stored in the cloud.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
`;

const verificationFlowTsx = `
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Check, AlertTriangle, X, Loader2, Send, Keyboard } from 'lucide-react';
import { VerificationStep } from '../types';
import { api } from '../services/api';

type VerificationMode = 'UPLOAD' | 'MANUAL';

interface VerificationFlowProps {
  userId: string;
  onComplete: () => void;
}

export const VerificationFlow: React.FC<VerificationFlowProps> = ({ userId, onComplete }) => {
  const [step, setStep] = useState<VerificationStep>(VerificationStep.UPLOAD);
  const [mode, setMode] = useState<VerificationMode>('UPLOAD');
  
  const [file, setFile] = useState<File | null>(null);
  const [manualData, setManualData] = useState({ certificateId: '', name: '', institutionId: '' });
  const [institutions, setInstitutions] = useState<any[]>([]);

  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    const loadInsts = async () => {
      try {
        const data = await api.getAllInstitutions();
        setInstitutions(data.filter((i:any) => i.status === 'ACTIVE'));
      } catch (e) {}
    };
    loadInsts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStep(VerificationStep.PREVIEW);
    }
  };

  const handleSubmission = async () => {
    setStep(VerificationStep.PROCESSING);
    try {
      let res;
      if (mode === 'UPLOAD' && file) {
        res = await api.submitVerificationRequest(file, userId);
      } else {
        res = await api.submitManualRequest(manualData, userId);
      }
      
      setRequestId(res.requestId);
      setStep(VerificationStep.HANDOVER);
    } catch (e) {
      alert("Submission Failed");
      setStep(VerificationStep.UPLOAD);
    }
  };

  const resetFlow = () => {
    setFile(null);
    setManualData({ certificateId: '', name: '', institutionId: '' });
    setStep(VerificationStep.UPLOAD);
    setRequestId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          {['Input', 'Preview', 'Submitting', 'Handover'].map((label, index) => {
            const isActive = index <= step;
            return (
              <div key={label} className="flex flex-col items-center bg-slate-50 px-2">
                <div className={\`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors \${isActive ? 'bg-gov-blue text-white' : 'bg-gray-300 text-gray-600'}\`}>
                  {index + 1}
                </div>
                <span className={\`text-xs mt-1 font-medium \${isActive ? 'text-gov-blue' : 'text-gray-500'}\`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Input */}
      {step === VerificationStep.UPLOAD && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
             <button onClick={() => setMode('UPLOAD')} className={\`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 \${mode === 'UPLOAD' ? 'bg-blue-50 text-gov-blue border-b-2 border-gov-blue' : 'text-gray-500 hover:bg-gray-50'}\`}>
                <Upload size={18} /> Upload Document
             </button>
             <button onClick={() => setMode('MANUAL')} className={\`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 \${mode === 'MANUAL' ? 'bg-blue-50 text-gov-blue border-b-2 border-gov-blue' : 'text-gray-500 hover:bg-gray-50'}\`}>
                <Keyboard size={18} /> Enter Details Manually
             </button>
          </div>

          <div className="p-10">
            {mode === 'UPLOAD' ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 text-gov-blue rounded-full mx-auto flex items-center justify-center mb-6"><Upload size={40} /></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Certificate</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Supported formats: PDF, JPG, PNG. Max size: 5MB.</p>
                <div className="flex justify-center">
                  <label className="cursor-pointer bg-gov-blue hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded shadow transition-colors">
                    <span>Choose File</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => {e.preventDefault(); handleSubmission();}} className="max-w-lg mx-auto space-y-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label><input required className="w-full border p-3 rounded" value={manualData.certificateId} onChange={e => setManualData({...manualData, certificateId: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label><input required className="w-full border p-3 rounded" value={manualData.name} onChange={e => setManualData({...manualData, name: e.target.value})} /></div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                   <select required className="w-full border p-3 rounded" value={manualData.institutionId} onChange={e => setManualData({...manualData, institutionId: e.target.value})}>
                     <option value="">Select Institution</option>
                     {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
                   </select>
                </div>
                <button type="submit" className="w-full bg-gov-blue hover:bg-blue-800 text-white font-bold py-3 rounded shadow mt-4">Submit Verification Request</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Preview (Upload only) */}
      {step === VerificationStep.PREVIEW && file && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden text-center p-8">
          <h3 className="font-bold text-gray-700 mb-4">Confirm Submission</h3>
          <div className="bg-gray-100 p-4 rounded mb-6 inline-block">{file.name}</div>
          <p className="text-sm text-gray-500 mb-6">This document will be sent to the backend for AI analysis.</p>
          <div className="flex justify-center gap-4">
            <button onClick={resetFlow} className="text-gray-500">Cancel</button>
            <button onClick={handleSubmission} className="bg-gov-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow flex items-center gap-2">
              <Send size={18} /> Submit for Analysis
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Submitting */}
      {step === VerificationStep.PROCESSING && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <Loader2 size={60} className="text-gov-blue animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Sending to Secure Cloud...</h2>
        </div>
      )}

      {/* Step 4: Handover Result */}
      {step === VerificationStep.HANDOVER && (
        <div className="bg-white rounded-lg shadow-lg border-t-8 border-gov-green p-8 text-center">
          <div className="w-20 h-20 bg-green-100 text-gov-green rounded-full mx-auto flex items-center justify-center mb-6"><Check size={40} /></div>
          <h2 className="text-3xl font-bold text-gov-green mb-2">Request Submitted</h2>
          <p className="text-gray-600 mb-8">Your document has been successfully handed over to the backend verification engine.</p>
          <div className="bg-gray-50 p-4 rounded border border-gray-200 inline-block mb-6">
            <p className="text-xs text-gray-500 uppercase font-bold">Request ID</p>
            <p className="text-xl font-mono font-bold text-gray-800">{requestId}</p>
          </div>
          <p className="text-sm text-gray-500 mb-8">You can track the status of this request in your dashboard.</p>
          <div className="flex justify-center gap-4">
             <button onClick={resetFlow} className="px-6 py-2 border border-gray-300 rounded text-gray-700">Submit Another</button>
             <button onClick={onComplete} className="px-6 py-2 bg-gov-blue text-white rounded hover:bg-blue-800 font-bold">Go to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
};
`;

const userDashboardTsx = `
import React, { useEffect, useState } from 'react';
import { Clock, FileText, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface UserDashboardProps { onVerifyClick: () => void; userId?: string; }

export const UserDashboard: React.FC<UserDashboardProps> = ({ onVerifyClick, userId }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (userId) {
        const data = await api.getUserRequests(userId);
        setRequests(data);
      }
      setLoading(false);
    };
    if(userId) fetchData();
    else setLoading(false);
  }, [userId]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gov-blue" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-end">
        <div><h1 className="text-2xl font-bold text-gray-900 font-serif">My Dashboard</h1><p className="text-sm text-gray-500">Track your verification requests.</p></div>
        <button onClick={onVerifyClick} className="bg-gov-blue text-white px-6 py-2 rounded shadow font-semibold flex items-center gap-2"><FileText size={18} /> New Request</button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50"><h3 className="font-bold text-gray-700 flex items-center gap-2"><Clock size={18} /> Request History</h3></div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{req.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{req.type}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold rounded bg-yellow-100 text-yellow-800">{req.status}</span></td>
              </tr>
            ))}
            {requests.length === 0 && <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No requests found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
`;

const institutionDashboardTsx = `
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Database, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface Props { userId?: string; institutionId?: string; }

export const InstitutionDashboard: React.FC<Props> = ({ userId, institutionId }) => {
  const [uploadState, setUploadState] = useState<'IDLE' | 'UPLOADING' | 'SUCCESS'>('IDLE');
  const [processedCount, setProcessedCount] = useState(0);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadState('UPLOADING');
      try {
        const idToUse = institutionId || "INST-CURRENT";
        const result: any = await api.uploadBulkData(file, idToUse);
        setProcessedCount(result.recordsProcessed);
        setUploadState('SUCCESS');
      } catch (err) {
        setUploadState('IDLE');
        alert("Upload Failed");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div><h1 className="text-2xl font-bold text-gray-900 font-serif">Registrar Portal</h1><p className="text-sm text-gray-500">Manage certificate records.</p></div>
        <div className="bg-blue-50 text-gov-blue px-4 py-2 rounded border border-blue-200 font-mono text-sm">Status: <span className="text-green-600 font-bold">ACTIVE</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Database size={20} /> Secure Bulk Upload</h2>
          <p className="text-gray-600 text-sm mb-6">Upload CSV files. Data will be saved to the Central Database.</p>
          {uploadState === 'IDLE' && (
            <label className="block border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600 font-medium">Click to upload CSV</p>
              <input type="file" className="hidden" accept=".csv" onChange={handleUpload} />
            </label>
          )}
          {uploadState === 'UPLOADING' && <div className="p-10 text-center"><Loader2 className="mx-auto h-10 w-10 text-gov-blue animate-spin mb-4" /><p className="mt-4 text-sm text-gov-blue font-bold">Saving to Database...</p></div>}
          {uploadState === 'SUCCESS' && (
             <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
               <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-2" />
               <h3 className="text-lg font-bold text-green-800">Database Updated</h3>
               <p className="text-green-700 text-sm">{processedCount} records saved to Cloud Firestore.</p>
               <button onClick={() => setUploadState('IDLE')} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-bold">Upload Another</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
`;

const adminDashboardTsx = `
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MONTHLY_STATS } from '../constants';
import { api } from '../services/api';
import { Institution } from '../types';
import { Check, X, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  const fetchInstitutions = async () => {
    const data = await api.getAllInstitutions();
    setInstitutions(data);
  };

  useEffect(() => { fetchInstitutions(); }, []);

  const handleStatusUpdate = async (id: string, status: 'ACTIVE' | 'REJECTED') => {
    await api.updateInstitutionStatus(id, status);
    fetchInstitutions();
  };

  const pendingInstitutions = institutions.filter(i => i.status === 'PENDING');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 font-serif mb-8">Admin Console</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow border-t-4 border-gov-blue"><div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Verifications</div><div className="text-2xl font-bold">14,205</div></div>
        <div className="bg-white p-4 rounded shadow border-t-4 border-gov-orange"><div className="text-gray-500 text-xs font-bold uppercase mb-1">Pending Approvals</div><div className="text-2xl font-bold text-orange-600">{pendingInstitutions.length}</div></div>
      </div>
      
      {pendingInstitutions.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg mb-8 p-6">
          <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2"><AlertTriangle size={20}/> Applications Pending Approval</h3>
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Institution</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th></tr></thead>
              <tbody className="divide-y divide-gray-200">
                {pendingInstitutions.map(inst => (
                  <tr key={inst.id}>
                    <td className="px-6 py-4 font-bold text-gray-900">{inst.name}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleStatusUpdate(inst.id, 'ACTIVE')} className="bg-green-100 text-green-700 p-1 rounded hover:bg-green-200" title="Approve"><Check size={18} /></button>
                      <button onClick={() => handleStatusUpdate(inst.id, 'REJECTED')} className="bg-red-100 text-red-700 p-1 rounded hover:bg-red-200" title="Reject"><X size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow h-80">
        <h3 className="font-bold text-gray-700 mb-4">Verification Volume</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_STATS}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#1e3a8a" /></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
`;

const profilePageTsx = `
import React from 'react';
import { User, Shield } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gov-dark font-serif mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow border-t-4 border-gov-blue overflow-hidden p-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-gov-blue rounded-full flex items-center justify-center text-white mb-4 shadow-lg border-4 border-white"><User size={48} /></div>
          <h2 className="text-xl font-bold text-gray-900">User</h2>
          <p className="text-sm text-gray-500">Authenticated via Google</p>
          <span className="mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1"><Shield size={12} /> Google Verified</span>
      </div>
    </div>
  );
};
`;

const institutionRegistrationTsx = `
import React, { useState } from 'react';
import { api } from '../services/api';
import { Building, CheckCircle } from 'lucide-react';

interface Props { onNavigate: (page: string) => void; }

export const InstitutionRegistration: React.FC<Props> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', code: '', region: '', contactEmail: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    
    setLoading(true);
    setError('');
    try {
      await api.registerInstitution(formData);
      setStep(2);
    } catch (error: any) { 
      setError(error.code === 'auth/email-already-in-use' ? "Email already registered." : "Registration failed."); 
    } finally { setLoading(false); }
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded shadow text-center border-t-4 border-gov-green">
          <CheckCircle className="w-16 h-16 text-gov-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Submitted</h2>
          <p className="text-gray-600 mb-6">Your application for <strong>{formData.name}</strong> has been sent to the Department of Higher Education.</p>
          <button onClick={() => onNavigate('login')} className="bg-gov-blue text-white px-6 py-2 rounded">Back to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded shadow-lg overflow-hidden">
        <div className="bg-gov-blue p-6 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full"><Building size={32} /></div>
          <div><h1 className="text-2xl font-serif font-bold">Institution Registration</h1><p className="text-blue-200 text-sm">Official onboarding form</p></div>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input required className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Code</label><input required className="w-full border p-2 rounded" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Region</label><input required className="w-full border p-2 rounded" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input required className="w-full border p-2 rounded" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} /></div>
          </div>
          <div className="border-t pt-6"><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input required type="password" className="w-full border p-2 rounded" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => onNavigate('login')} className="text-gray-600">Cancel</button>
            <button type="submit" disabled={loading} className="bg-gov-orange text-white px-8 py-2 rounded font-bold shadow hover:bg-orange-600 disabled:opacity-50">{loading ? 'Submitting...' : 'Submit Application'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
`;

const authTsx = `
import React, { useState } from 'react';
import { UserRole } from '../types';
import { api } from '../services/api';
import { User, Building, ShieldAlert, Loader2, PlusCircle } from 'lucide-react';
import * as firebaseAuth from "firebase/auth";
import { auth } from '../firebaseConfig';

interface AuthProps { onLogin: (role: UserRole, userData?: any) => void; onNavigate: (page: string) => void; }

export const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState({ id: '', password: '' });

  const handleGoogleLogin = async () => {
    setLoading(true); setError('');
    try { const user = await api.loginGoogle(); onLogin(UserRole.USER, user); } 
    catch (e) { setError('Google Authentication Failed'); } finally { setLoading(false); }
  };

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(''); setMsg('');
    try {
      let user;
      if (activeTab === UserRole.ADMIN) user = await api.loginAdmin(formData.id, formData.password);
      else if (activeTab === UserRole.INSTITUTION) user = await api.loginInstitution(formData.id, formData.password);
      onLogin(activeTab, user);
    } catch (err: any) { setError(err.message || 'Login Failed'); } finally { setLoading(false); }
  };

  const handleCreateAdmin = async () => {
    try {
      setLoading(true);
      await firebaseAuth.createUserWithEmailAndPassword(auth, 'admin@satyacert.gov.in', 'password123');
      setMsg('Admin Created! Email: admin@satyacert.gov.in, Pass: password123');
      setFormData({ id: 'admin@satyacert.gov.in', password: 'password123' });
    } catch (e: any) {
      if(e.code === 'auth/email-already-in-use') {
        setMsg('Admin account already exists. Please login.');
        setFormData({ id: 'admin@satyacert.gov.in', password: '' });
      } else { setError(e.message); }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-gov-blue">
        <h2 className="text-center text-3xl font-serif font-bold text-gray-900">Sign in to SatyaCert</h2>
        <div className="flex border-b border-gray-200 mb-6">
          {[UserRole.USER, UserRole.INSTITUTION, UserRole.ADMIN].map(role => (
             <button key={role} className={\`flex-1 py-3 text-sm font-medium border-b-2 flex justify-center gap-2 \${activeTab === role ? 'border-gov-blue text-gov-blue' : 'border-transparent text-gray-500'}\`} onClick={() => {setActiveTab(role); setError(''); setMsg('');}}>{role}</button>
          ))}
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">{error}</div>}
        {msg && <div className="bg-green-50 text-green-600 p-3 rounded text-sm text-center border border-green-200">{msg}</div>}
        {activeTab === UserRole.USER ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded text-sm text-blue-800 border border-blue-100">Citizens authenticate via Google linked to DigiLocker.</div>
            <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-bold py-3 px-4 rounded shadow-sm">
              {loading ? <Loader2 className="animate-spin" /> : <span>Sign in with Google</span>}
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleStandardLogin}>
            <input type="text" required className="w-full px-3 py-3 border border-gray-300 rounded" placeholder={activeTab === UserRole.ADMIN ? "Admin Email" : "Institution Email"} value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
            <input type="password" required className="w-full px-3 py-3 border border-gray-300 rounded" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            <button type="submit" disabled={loading} className="w-full py-3 bg-gov-blue text-white rounded shadow-lg hover:bg-blue-900 font-bold flex justify-center">{loading ? <Loader2 className="animate-spin" /> : 'Sign In'}</button>
          </form>
        )}
        {activeTab === UserRole.ADMIN && (
           <div className="text-center pt-2"><button type="button" onClick={handleCreateAdmin} className="text-xs text-gray-400 hover:text-gov-blue flex items-center justify-center gap-1 w-full"><PlusCircle size={12} /> Initialize Demo Admin</button></div>
        )}
        {activeTab === UserRole.INSTITUTION && (
           <div className="text-center mt-4 border-t pt-4"><span className="text-sm text-gray-600">Not registered? </span><button onClick={() => onNavigate('register-institution')} className="text-sm font-bold text-gov-orange hover:underline">Register New Institution</button></div>
        )}
      </div>
    </div>
  );
};
`;

const appTsx = `
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Auth } from './pages/Auth';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { InstitutionDashboard } from './pages/InstitutionDashboard';
import { VerificationFlow } from './pages/VerificationFlow';
import { ProfilePage } from './pages/ProfilePage';
import { InstitutionRegistration } from './pages/InstitutionRegistration';
import { UserRole } from './types';
import { api } from './services/api';
import { auth } from './firebaseConfig';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  // Session Persistence Logic
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const savedRole = localStorage.getItem('satyacert_role') as UserRole;
        if (savedRole) {
          setCurrentUserRole(savedRole);
          setUserData({
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'User',
            id: localStorage.getItem('satyacert_inst_id') || user.uid
          });
          // If we are on landing or login, redirect to dashboard on restore
          if (currentPage === 'landing' || currentPage === 'login') {
             if (savedRole === UserRole.ADMIN) setCurrentPage('admin-dashboard');
             else if (savedRole === UserRole.INSTITUTION) setCurrentPage('institution-dashboard');
             else setCurrentPage('user-dashboard');
          }
        }
      } else {
        setCurrentUserRole(null);
        setUserData(null);
      }
      setIsRestoring(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (role: UserRole, data?: any) => {
    setCurrentUserRole(role);
    setUserData(data);
    
    localStorage.setItem('satyacert_role', role);
    if (data?.id && role === UserRole.INSTITUTION) {
      localStorage.setItem('satyacert_inst_id', data.id);
    }

    if (role === UserRole.ADMIN) setCurrentPage('admin-dashboard');
    else if (role === UserRole.INSTITUTION) setCurrentPage('institution-dashboard');
    else setCurrentPage('user-dashboard');
  };

  const handleLogout = async () => { 
    await api.logout();
    localStorage.removeItem('satyacert_role');
    localStorage.removeItem('satyacert_inst_id');
    setCurrentUserRole(null); 
    setUserData(null); 
    setCurrentPage('landing'); 
  };

  const renderPage = () => {
    if (isRestoring) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-gov-blue">Loading secure session...</div>;

    switch(currentPage) {
      case 'landing': return <LandingPage onNavigate={setCurrentPage} />;
      case 'login': return <Auth onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'register-institution': return <InstitutionRegistration onNavigate={setCurrentPage} />;
      case 'user-dashboard': return <UserDashboard onVerifyClick={() => setCurrentPage('verification')} userId={userData?.uid} />;
      case 'admin-dashboard': return <AdminDashboard />;
      case 'institution-dashboard': return <InstitutionDashboard userId={userData?.uid} institutionId={userData?.id} />;
      case 'profile': return <ProfilePage />;
      case 'verification': return <div className="py-10 bg-slate-50 min-h-screen"><VerificationFlow userId={userData?.uid} onComplete={() => setCurrentPage('user-dashboard')} /></div>;
      default: return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar onNavigate={setCurrentPage} currentUser={userData?.name || (currentUserRole ? 'User' : null)} role={currentUserRole} onLogout={handleLogout} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;
`;

// --- WRITE FILES ---

console.log("Creating project files...");
writeFile('package.json', JSON.stringify(packageJson, null, 2));
writeFile('tsconfig.json', JSON.stringify(tsConfig, null, 2));
writeFile('tsconfig.app.json', JSON.stringify(tsConfigApp, null, 2));
writeFile('tsconfig.node.json', JSON.stringify(tsConfigNode, null, 2));
writeFile('vite.config.ts', viteConfig);
writeFile('tailwind.config.js', tailwindConfig);
writeFile('postcss.config.js', postCssConfig);
writeFile('index.html', indexHtml);
writeFile('src/index.css', indexCss);
writeFile('src/firebaseConfig.ts', firebaseConfigTs);
writeFile('src/main.tsx', mainTsx);
writeFile('src/App.tsx', appTsx);
writeFile('src/types.ts', typesTs);
writeFile('src/constants.ts', constantsTs);
writeFile('src/components/Navbar.tsx', navbarTsx);
writeFile('src/components/Footer.tsx', footerTsx);
writeFile('src/services/api.ts', apiTs);
writeFile('src/pages/LandingPage.tsx', landingPageTsx);
writeFile('src/pages/Auth.tsx', authTsx);
writeFile('src/pages/UserDashboard.tsx', userDashboardTsx);
writeFile('src/pages/AdminDashboard.tsx', adminDashboardTsx);
writeFile('src/pages/InstitutionDashboard.tsx', institutionDashboardTsx);
writeFile('src/pages/InstitutionRegistration.tsx', institutionRegistrationTsx);
writeFile('src/pages/VerificationFlow.tsx', verificationFlowTsx);
writeFile('src/pages/ProfilePage.tsx', profilePageTsx);

console.log("Setup complete! Run 'npm install' then 'npm run dev'.");
