import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { userCollectionRef } from "../firebase";
import { UserModel, UserUpdateDto } from "../models/userModel";

export async function createUser(user: UserModel) {
  const { userId, ...userDetails } = user;
  await setDoc(doc(userCollectionRef, userId), {
    ...userDetails,
  });
}

export async function getUserById(userId: string): Promise<UserModel | null> {
  let user: UserModel | null = null;

  const docRef = doc(userCollectionRef, userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    user = { ...(docSnap.data() as UserModel), userId };
  } else {
    throw new Error("User Not Found");
  }

  return user;
}

// export async function updateUser(user: UserModel) {
//   const { userId, ...userDetails } = user;
//   await setDoc(doc(userCollectionRef, userId), {
//     ...userDetails,
//   });
// }

export async function updateUser(
  userId: string,
  fieldsToUpdate: UserUpdateDto
) {
  const userRef = doc(userCollectionRef, userId);
  await updateDoc(userRef, fieldsToUpdate);
}
