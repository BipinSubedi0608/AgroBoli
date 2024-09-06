import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // For unique file names
import { storage } from "../firebase";

export async function uploadImage(image: File): Promise<string> {
  const storageRef = ref(storage, `products/${uuidv4()}-${image.name}`);
  const snapshot = await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}
