import { userData } from "@/types/common.type";

export interface userSliceData {
  isLoggedIn: boolean;
  userData: userData | null;
}

export interface registrationData {}

export interface globalStateInterface {
  counter: number;
}
export interface userProfileImageInterface {
  refresh: boolean;
  image: string;
  AuthorizedNetCred: { login_id: string, client_key: string };
}
