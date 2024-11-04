import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtWj2v74JXTzEKGVdwEg9OK0i6AfVx1Io",
  authDomain: "taskmanager-913e8.firebaseapp.com",
  projectId: "taskmanager-913e8",
  storageBucket: "taskmanager-913e8.appspot.com",
  messagingSenderId: "1030439157704",
  appId: "1:1030439157704:web:2aad017611765d870a0afd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
export default app;

