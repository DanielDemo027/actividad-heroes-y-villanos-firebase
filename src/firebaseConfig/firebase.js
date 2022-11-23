import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAUDFH1qx_cDcGVUvh4wszluFbrPgNb6_Q",
  authDomain: "rene-app-react.firebaseapp.com",
  projectId: "rene-app-react",
  storageBucket: "rene-app-react.appspot.com",
  messagingSenderId: "700594061334",
  appId: "1:700594061334:web:5cdace1886fdc1ffecb537",
  measurementId: "G-74SW8FCMNS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)