import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "../lib/firebase.prod";

export default function useAuthListener() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("authUser"))
    );
    const auth = getAuth(firebase);

    onAuthStateChanged(auth, authUser => {
        if (authUser) {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            setUser(authUser);
        } else {
            localStorage.removeItem("authUser");
            setUser(null);
        }
    });

    return { user };
}
