import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_h8xOK4dLeqqWVgO_RaBgzOqxwX5wiAU",
  authDomain: "lev-ron-todo-list.firebaseapp.com",
  projectId: "lev-ron-todo-list",
  storageBucket: "lev-ron-todo-list.appspot.com",
  messagingSenderId: "368527513196",
  appId: "1:368527513196:web:12c662adeef104c6c4aa49",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp); // Use getFirestore here
// export const database = getDatabase(firebaseApp);
