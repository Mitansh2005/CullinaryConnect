import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailPassword= async ( email , password ) => {
  return createUserWithEmailAndPassword(auth,email,password)
}

export const doSignInWithEmailPassword = ( email , password ) => {
  return signInWithEmailAndPassword(auth,email,password)
}

export const doSignInWithGoogle = async () => {
  const provider=new GoogleAuthProvider()
  const result=await signInWithPopup(auth,provider)
  return result
}

export const doSignOut = () => {
  return auth.signOut()
}

// export const doPasswordReset = (event,email) => {
//   event.preventDefault()
//   return sendPasswordResetEmail(auth,email)
// }

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser , password)
}