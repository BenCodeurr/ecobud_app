/* eslint-disable no-unused-vars */

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "ecobuddi-ef9ff.firebaseapp.com",
  projectId: "ecobuddi-ef9ff",
  storageBucket: "ecobuddi-ef9ff.appspot.com",
  messagingSenderId: "549979189086",
  appId: "1:549979189086:web:9afc6efdfbda7e228d69cf"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();