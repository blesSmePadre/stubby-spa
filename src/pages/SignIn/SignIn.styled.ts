/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import styled from 'styled-components';
import { Form as FormikForm } from 'formik';
import { Link } from 'react-router-dom';

import { Colors } from '@types';

import { textMixin } from 'styles/helpers';

const googleIcon = require('assets/icons/google.svg');

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled(FormikForm)`
  width: 400px;
  padding: 25px;
  border: 1px solid ${Colors.alto};
  border-radius: 8px;
  background: ${Colors.white};
  text-align: center;
`;

export const SignUpLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;

  ${textMixin({
    align: 'center',
    size: 13,
    color: 'valencia',
    weight: 'bold',
    textDecoration: 'underline',
  })}
`;

export const Sep = styled.div`
  &::after,
  &::before {
    content: '';
    display: block;
    width: 40%;
    height: 1px;
    background: ${Colors.alto};
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid ${Colors.alto};
  border-radius: 5px;
  width: 100%;

  ${textMixin({
    align: 'center',
    size: 12,
    color: 'black',
  })}
`;

export const GoogleIcon = styled(googleIcon)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
