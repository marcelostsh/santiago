import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLe2TOSDo7xeMZh4ARVXbd1FiPCVCUNGo",
  authDomain: "roteiroviagem-b5116.firebaseapp.com",
  projectId: "roteiroviagem-b5116",
  storageBucket: "roteiroviagem-b5116.firebasestorage.app",
  messagingSenderId: "872269638046",
  appId: "1:872269638046:web:2718740bd2eba8ba028e8f",
  measurementId: "G-EV395T3365"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app); 