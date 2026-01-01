import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCprZXQxcOe2IpD8Eal2IMYeUls9cTZ6QA",
  authDomain: "gameroom-chat.firebaseapp.com",
  projectId: "gameroom-chat",
  storageBucket: "gameroom-chat.firebasestorage.app",
  messagingSenderId: "278299636850",
  appId: "1:278299636850:web:415094ef7c569289befeeb"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
