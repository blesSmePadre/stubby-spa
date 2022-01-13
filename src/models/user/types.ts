export const sliceName = 'users';

export interface User {
  id: number;
  email: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface GoogleAuthPayload {
  token: string;
}

export interface VerifyPayload {
  email: string;
  confirmationCode: string;
}

export interface UserState {
  signingUp: boolean;
  signingIn: boolean;
  verifying: boolean;
  signUpError?: string;
  signInError?: string;
  verifyError?: string;
  current?: User | null;
}
