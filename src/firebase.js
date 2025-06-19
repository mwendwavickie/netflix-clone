import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "netflix-clone.firebaseapp.com",
    projectId: "netflix-clone-29d49",
    appId: "YOUR_APP_ID",
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
