export interface UserModel {
  // Primary Key
  userId?: string;

  displayName?: string;
  email?: string;
  role?: "buyer" | "seller";
  location?: string;
  avatar?: string;
  phone: string;
  isVerified: boolean;
}

export interface UserCreateDto {
  displayName?: string;
  email?: string;
  password?: string;
  role?: "buyer" | "seller";
}

export type UserUpdateDto = Partial<
  Pick<UserModel, "displayName" | "avatar" | "phone" | "isVerified">
>;
