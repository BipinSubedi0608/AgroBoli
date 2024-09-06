import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPe8GxHNJ5IB0xV708Es6-ZfORkMBWsFY",
  authDomain: "agroboli.firebaseapp.com",
  projectId: "agroboli",
  storageBucket: "agroboli.appspot.com",
  messagingSenderId: "1092049695123",
  appId: "1:1092049695123:web:c71d95e4a9e20f6f60b866",
  measurementId: "G-8H1M8MF5CK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);
const productCollectionRef = collection(db, "products");
const userCollectionRef = collection(db, "users");
const storage = getStorage();

export {
  analytics,
  productCollectionRef,
  userCollectionRef,
  auth,
  googleProvider,
  storage,
};
