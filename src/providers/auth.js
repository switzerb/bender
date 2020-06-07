import 'firebase/auth'
import firebase from "firebase";

export const auth = firebase.auth;

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}

export function logout() {
    return auth().signOut();
}
