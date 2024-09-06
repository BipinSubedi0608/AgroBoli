import {
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { UserModel } from "../models/userModel";
import { getUserById, updateUser } from "../services/firebaseUserServices";

export const AuthContext = createContext<{
  currentUser: UserModel | null;
  loading: boolean;
}>({
  currentUser: null,
  loading: true,
});

export default function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        const unsubscribe = onAuthStateChanged(
          auth,
          async (user: User | null) => {
            if (user?.emailVerified) {
              await updateUser(user.uid, { isVerified: true });
              setCurrentUser(
                (prevUser) =>
                  ({
                    ...prevUser,
                    isVerified: true,
                  } as UserModel)
              );
            }

            if (user) {
              const userDisplayData: UserModel | null = await getUserById(
                user.uid
              );
              setCurrentUser(userDisplayData || null);
            } else {
              setCurrentUser(null);
            }
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting persistence:", error);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
