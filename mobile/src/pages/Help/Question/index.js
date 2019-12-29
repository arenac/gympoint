import React from 'react';

import { Container, Card, Header, Type, When, Text } from './styles';

export default function Question({ navigation }) {
  const help = navigation.getParam('help');
  return (
    <Container>
      <Card>
        <Header>
          <Type>QUESTION</Type>
          <When>{help.formatedDate}</When>
        </Header>
        <Text>{help.question}</Text>
        <Header>
          <Type>ANSWER</Type>
        </Header>
        <Text>{help.answer}</Text>
      </Card>
    </Container>
  );
}
