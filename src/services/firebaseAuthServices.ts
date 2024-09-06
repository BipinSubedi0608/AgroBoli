import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { UserCreateDto, UserModel } from "../models/userModel";
import { createUser } from "./firebaseUserServices";

export async function registerWithEmailAndPassword({
  email,
  password,
  displayName,
  role,
}: UserCreateDto): Promise<void> {
  const userSnap = await createUserWithEmailAndPassword(
    auth,
    email!,
    password!
  );

  const userToCreate: UserModel = {
    phone: "",
    avatar: "",
    displayName,
    email,
    role,
    userId: userSnap.user.uid,
    isVerified: false,
  };

  await createUser(userToCreate);
}

export async function loginWithEmailAndPassword({
  email = "",
  password = "",
}: {
  email: string;
  password: string;
}): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

// export async function loginWithGoogle(): Promise<void> {
//   const userSnap = await signInWithPopup(auth, googleProvider);
// }

export async function resetPassword({
  email = "",
}: {
  email: string;
}): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function verifyEmail(): Promise<void> {
  await sendEmailVerification(auth.currentUser!);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}
