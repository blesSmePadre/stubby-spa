import { request, Methods } from 'utils/request';

import {
  User,
  SignUpPayload,
  SignInPayload,
  VerifyPayload,
  GoogleAuthPayload,
} from './types';

export const signUp = (payload: SignUpPayload) =>
  request(Methods.POST, {
    url: '/auth/signup',
    data: payload,
  });

export const signIn = (payload: SignInPayload) =>
  request<User>(Methods.POST, {
    url: '/auth/signin',
    data: payload,
  });

export const googleAuth = (payload: GoogleAuthPayload) =>
  request<User>(Methods.POST, {
    url: '/auth/oauth',
    data: payload,
  });

export const verify = (payload: VerifyPayload) =>
  request<User>(Methods.PUT, {
    url: '/auth/verify',
    data: payload,
  });

export const getCurrentUser = () =>
  request<User>(Methods.GET, {
    url: '/users/current',
  });
