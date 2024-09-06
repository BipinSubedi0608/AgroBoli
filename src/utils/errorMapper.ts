export const getErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    "auth/invalid-credential": "Invalid credential.",
    "auth/user-disabled": "User account is disabled.",
    "auth/user-not-found": "No user found with the provided credentials.",
    "auth/wrong-password": "Incorrect password.",
    "auth/weak-password": "The password is too weak.",
    "auth/email-already-in-use":
      "The email is already in use by another account.",
    "auth/invalid-email": "The email address is not valid.",
    "auth/missing-password": "Password cannot be empty",
  };

  return errorMessages[errorCode] || "An unknown error occurred.";
};
