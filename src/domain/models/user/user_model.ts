export interface UserModel {
  email: string;
  full_name: string;
  role: "user" | "admin";
  verified: boolean;
  enable_2fa: boolean;
}

export interface UserWithTokenModel {
  user: UserModel;
  access_token: string;
  refresh_token: string;
  requires_otp?: boolean;
  login_token?: string;
}
