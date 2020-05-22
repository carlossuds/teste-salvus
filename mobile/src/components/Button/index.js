import React from 'react';

import {Container, Text} from './styles';

export default function Button({children, title, ...rest}) {
  return (
    <Container {...rest}>
      <Text>{title}</Text>
    </Container>
  );
}
