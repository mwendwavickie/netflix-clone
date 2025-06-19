import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAShqnWi7rUBBuiknV0ZZKcwqPfRH8vFRo",
    authDomain: "netflix-clone.firebaseapp.com",
    projectId: "netflix-clone-29d49",
    appId: "125913013364",
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
