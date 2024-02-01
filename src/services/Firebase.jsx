/* eslint-disable no-unused-vars */

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "ecobuddi-ef9ff.firebaseapp.com",
  projectId: "ecobuddi-ef9ff",
  storageBucket: "ecobuddi-ef9ff.appspot.com",
  messagingSenderId: "549979189086",
  appId: "1:549979189086:web:9afc6efdfbda7e228d69cf"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (value) => {
  try {
    console.log("value... ", value)

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create a new user document in Firestore if the user doesn't exist
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        userID: user.uid,
        // user id
      });
    }

    return user;

  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signUpWithGoogle = async (value) => {
  try {
    console.log("value... ", value)

    const result = await signUpWithGoogleWithPopup(auth, googleProvider);
    const user = result.user;

    // Create a new user document in Firestore if the user doesn't exist
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        userID: user.uid,
        // user id
      });
    }

    return user;

  } catch (error) {
    console.error(error);
    return null;
  }
};

//  custom hook to get current User
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);

  return currentUser;
};


export const auth = getAuth();