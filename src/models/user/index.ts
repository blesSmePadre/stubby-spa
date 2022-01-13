/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';

import * as thunks from './thunks';

const initialState: UserState = {
  signingIn: false,
  signingUp: false,
  verifying: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunks.signIn.pending, (state) => {
      state.signInError = '';
      state.signingIn = true;
    });
    builder.addCase(thunks.signIn.fulfilled, (state, { payload }) => {
      state.signingIn = false;
      state.current = payload ? payload.data : null;
    });
    builder.addCase(thunks.signIn.rejected, (state, { payload }) => {
      state.signingIn = false;
      state.signInError = payload as string;
    });
    builder.addCase(thunks.verify.pending, (state) => {
      state.verifying = true;
      state.verifyError = '';
    });
    builder.addCase(thunks.verify.fulfilled, (state, { payload }) => {
      state.verifying = false;
      state.current = payload ? payload.data : null;
    });
    builder.addCase(thunks.verify.rejected, (state, { payload }) => {
      state.verifying = false;
      state.verifyError = payload;
    });
    builder.addCase(thunks.signUp.pending, (state, { meta }) => {
      state.current = { id: -1, email: meta.arg.email };
      state.signUpError = '';
      state.signingUp = true;
    });
    builder.addCase(thunks.signUp.fulfilled, (state) => {
      state.signingUp = false;
    });
    builder.addCase(thunks.signUp.rejected, (state, { payload }) => {
      state.signingUp = false;
      state.signUpError = payload;
    });
    builder.addCase(thunks.googleAuth.fulfilled, (state, { payload }) => {
      state.current = payload.data;
    });
    builder.addCase(thunks.getCurrentUser.fulfilled, (state, { payload }) => {
      state.current = payload;
    });
  },
});

export default usersSlice.reducer;
