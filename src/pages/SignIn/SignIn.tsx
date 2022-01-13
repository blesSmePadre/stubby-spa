import React, { useCallback } from 'react';
import { Formik } from 'formik';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { Routes, FontWeights } from '@types';
import { SignInPayload, GoogleAuthPayload } from 'models/user/types';
import { signInErrorSelector } from 'models/user/selectors';

import config from '@config';

import Button from 'components/Button';
import AuthField from 'components/Forms/AuthField';
import Logo from 'components/Logo';
import Text from 'components/Text';

import _isEmpty from 'lodash/isEmpty';

import * as S from './SignIn.styled';

type Props = {
  onSignIn: (payload: SignInPayload) => void;
  onGoogleAuth: (payload: GoogleAuthPayload) => void;
  signInError: ReturnType<typeof signInErrorSelector>;
};

const SignIn = ({ onSignIn, onGoogleAuth, signInError }: Props) => {
  const handleGoogleAuthSuccess = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if ('accessToken' in response) {
        onGoogleAuth({ token: response.accessToken });
      }
    },
    [onGoogleAuth]
  );

  return (
    <S.Root>
      <Formik onSubmit={onSignIn} initialValues={{ email: '', password: '' }}>
        {({ isValid, touched }) => (
          <S.Form>
            <Logo mb={20} />
            <AuthField label="Email" name="email" type="text" mb={10} />
            <AuthField
              label="Password"
              name="password"
              type="password"
              mb={20}
            />
            {signInError && (
              <Text
                fontWeight={FontWeights.bold}
                fontSize={12}
                mb={20}
                color="valencia"
              >
                {signInError}
              </Text>
            )}
            <Button
              type="submit"
              disabled={!isValid && !_isEmpty(touched)}
              mb={10}
            >
              Sign in
            </Button>
            <S.SignUpLink to={Routes.signUp}>
              or sign up for stubbyAPI
            </S.SignUpLink>
            <S.Sep>
              <Text fontSize={14} color="doveGray">
                OR
              </Text>
            </S.Sep>
            <GoogleLogin
              clientId={config.google.clientId}
              buttonText="Login"
              render={(props) => (
                <S.GoogleButton {...props}>
                  <S.GoogleIcon />
                  Continue with Google
                </S.GoogleButton>
              )}
              onSuccess={handleGoogleAuthSuccess}
              onFailure={(err) => console.info('google err', err)}
              cookiePolicy="single_host_origin"
            />
          </S.Form>
        )}
      </Formik>
    </S.Root>
  );
};

export default SignIn;
