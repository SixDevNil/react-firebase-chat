import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARj5G_TZbIskMV9GbzwdQJws-mRBI2VUE",
  authDomain: "reactchat-91265.firebaseapp.com",
  projectId: "reactchat-91265",
  storageBucket: "reactchat-91265.appspot.com",
  messagingSenderId: "994902045989",
  appId: "1:994902045989:web:b0f17b1317b53f1efed6cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
