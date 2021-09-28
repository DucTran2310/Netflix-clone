import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { seedDatabase } from "../seed";
import "firebase/compat/auth";
// import { seedDatabase } from "../seed";

// we need config here
const config = {
    apiKey: "AIzaSyClV8k0tjx_RYtDQH_PKdewaezSPTbdGxs",
    authDomain: "netflix-clone-a3926.firebaseapp.com",
    projectId: "netflix-clone-a3926",
    storageBucket: "netflix-clone-a3926.appspot.com",
    messagingSenderId: "462063040327",
    appId: "1:462063040327:web:0f38d71d2d882183c13e62",
    measurementId: "G-BYV9DB0QG3",
};

const firebase = initializeApp(config);
const defaultFirestore = getFirestore();

const data = seedDatabase();

const PushDataToFireStore = async () => {
    try {
        const cityRef = doc(defaultFirestore, "test", "test");
        await setDoc(cityRef, {
            data,
        });
    } catch (error) {
        console.log(error);
    }
};

export { defaultFirestore, firebase, PushDataToFireStore };
