import { initializeApp } from'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAl1bv1wVrWzb29IgTz1401puuI2uyCURg",
  authDomain: "vltech-web.firebaseapp.com",
  projectId: "vltech-web",
  storageBucket: "vltech-web.appspot.com",
  messagingSenderId: "298171010997",
  appId: "1:298171010997:web:e1e883bd08b33c4b9d93fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)



export {db, auth}