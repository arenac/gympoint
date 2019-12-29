import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import { Container, QuestionInput, NewQuestionButton } from './styles';

export default function NewQuestion({ navigation }) {
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.auth.student.id);
  const onAddNewHelp = navigation.getParam('onAddNewHelp');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (question !== '') {
      setLoading(true);
      const response = await api.post(`students/${id}/help-orders`, {
        question,
      });
      onAddNewHelp(response.data);
      navigation.navigate('HelpCenter');
    }
    setLoading(false);
  }

  return (
    <Container>
      <QuestionInput
        multiline
        numberOfLines={20}
        value={question}
        onChangeText={value => setQuestion(value)}
        placeholder="Insert your question"
        textAlignVertical="top"
      />
      <NewQuestionButton loading={loading} onPress={handleSubmit}>
        Send request
      </NewQuestionButton>
    </Container>
  );
}
