import React from 'react';
import { MarginProps } from 'styled-system';

import { ColorsStrings } from '@types';

import * as S from './Logo.styled';

type Props = MarginProps & { color?: ColorsStrings };

const Logo = ({ color = 'valencia', ...rest }: Props) => (
  <S.Root color={color} {...rest}>
    stuBBy API
  </S.Root>
);

export default Logo;
