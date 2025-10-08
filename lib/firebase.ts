import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBk2XbTx796D8_fBk3PoC30kvFH-NlaGLw",
  authDomain: "gardenias-522c7.firebaseapp.com",
  projectId: "gardenias-522c7",
  storageBucket: "gardenias-522c7.firebasestorage.app",
  messagingSenderId: "529552820037",
  appId: "1:529552820037:web:86c37b3cae2e34c1bc602c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enable anonymous authentication for development
auth.useDeviceLanguage();

export default app;
