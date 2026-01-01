import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth"
import { auth } from "../firebase"

const googleProvider = new GoogleAuthProvider()
export const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, {
        displayName: name
    })
    return userCredential
}


export const signInWithGoogle = () => {
   return signInWithPopup(auth, googleProvider)
}


export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
    return signOut(auth)
}
