import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// web app configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDkspjkDDXObs-4l_taNELJKtRdVwEASMk',
  authDomain: 'todo-app-73942.firebaseapp.com',
  projectId: 'todo-app-73942',
  storageBucket: 'todo-app-73942.appspot.com',
  messagingSenderId: '1010423735161',
  appId: '1:1010423735161:web:097586fa48bf62dfda85a8'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase()