import React from 'react';
import { Image } from 'react-native';

import image from '~/assets/header-logo.png';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={image} />
    </Container>
  );
}
