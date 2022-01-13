/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Routes } from '@types';
import {
  sliceName,
  SignUpPayload,
  SignInPayload,
  GoogleAuthPayload,
  VerifyPayload,
  UserState,
  User,
} from './types';

import * as api from './api';

export const googleAuth = createAsyncThunk<
  { data: User; nextRoute: string },
  GoogleAuthPayload,
  { rejectValue: string }
>(
  `${sliceName}/googleAuth`,
  async (payload: GoogleAuthPayload, { rejectWithValue }) => {
    try {
      const response = await api.googleAuth(payload);
      return { data: response.data, nextRoute: Routes.home };
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status === 400
      ) {
        return rejectWithValue('Invalid credentials');
      }

      console.error('error', err);
      return rejectWithValue('');
    }
  }
);

export const signUp = createAsyncThunk<
  { nextRoute: string },
  SignUpPayload,
  { rejectValue: string }
>(
  `${sliceName}/signUp`,
  async (payload: SignUpPayload, { rejectWithValue }) => {
    try {
      localStorage.setItem('confirm-email', payload.email);
      await api.signUp(payload);
      return { nextRoute: Routes.verify };
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status === 400
      ) {
        return rejectWithValue('The email is already taken');
      }

      console.error('error', err);
      return rejectWithValue('');
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        user: { signingUp },
      } = getState() as { user: UserState };

      return !signingUp;
    },
  }
);

export const signIn = createAsyncThunk<
  { data: User; nextRoute: string },
  SignInPayload,
  { rejectValue: string }
>(
  `${sliceName}/signIn`,
  async (payload: SignInPayload, { rejectWithValue }) => {
    try {
      const response = await api.signIn(payload);
      return { data: response.data, nextRoute: Routes.home };
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status === 400
      ) {
        return rejectWithValue('Invalid email or password');
      }

      console.error('error', err);
      return rejectWithValue('');
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        user: { signingIn },
      } = getState() as { user: UserState };

      return !signingIn;
    },
  }
);

export const verify = createAsyncThunk<
  { data: User; nextRoute: string },
  VerifyPayload,
  { rejectValue: string }
>(
  `${sliceName}/verify`,
  async (payload: VerifyPayload, { rejectWithValue }) => {
    try {
      const response = await api.verify(payload);
      return { data: response.data, nextRoute: Routes.home };
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.status === 400
      ) {
        return rejectWithValue('Invalid email or password');
      }

      console.error('error', err);
      return rejectWithValue('');
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        user: { verifying },
      } = getState() as { user: UserState };

      return !verifying;
    },
  }
);

export const getCurrentUser = createAsyncThunk(
  `${sliceName}/getCurrentUser`,
  async () => {
    try {
      const response = await api.getCurrentUser();
      return response.data;
    } catch (err) {
      console.error('err', err);
      return null;
    }
  }
);
