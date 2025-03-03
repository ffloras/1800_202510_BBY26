// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPZ_Eyv0O15NMI9tdUsdOugEsy-pPkpUk",
  authDomain: "team26-paws-and-homes.firebaseapp.com",
  projectId: "team26-paws-and-homes",
  storageBucket: "team26-paws-and-homes.firebasestorage.app",
  messagingSenderId: "45066407572",
  appId: "1:45066407572:web:c47e8ca706de8a7719ae81"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// initialize firestore database
const db = firebase.firestore();