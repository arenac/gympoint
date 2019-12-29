import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';

import api from '~/services/api';

import {
  Container,
  NewHelpQuestion,
  List,
  HelpContainer,
  HelpCard,
  Header,
  Status,
  When,
  Question,
} from './styles';

export default function Help({ navigation }) {
  const id = useSelector(state => state.auth.student.id);
  const [helpList, setHelpList] = useState([]);

  useEffect(() => {
    async function fetchHelpList() {
      const response = await api.get(`students/${id}/help-orders`);
      const data = response.data.map(help => {
        return {
          ...help,
          formatedDate: formatDistance(parseISO(help.createdAt), new Date(), {
            addSuffix: true,
            locale: en,
          }),
          answerd: help.answer !== null,
        };
      });
      setHelpList(data);
    }
    fetchHelpList();
  }, [id]);

  function onAddNewHelp(help) {
    if (help) {
      setHelpList(items => [
        {
          ...help,
          formatedDate: formatDistance(parseISO(help.createdAt), new Date(), {
            addSuffix: true,
            locale: en,
          }),
          answerd: false,
        },
        ...items,
      ]);
    }
  }

  function handleHelpRequest() {
    navigation.navigate('NewQuestion', { onAddNewHelp });
  }

  function handleShowQuestion(item) {
    navigation.navigate('Question', { help: item });
  }

  return (
    <Container>
      <NewHelpQuestion onPress={handleHelpRequest}>
        Request support
      </NewHelpQuestion>
      <List
        data={helpList}
        extraData={helpList}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <HelpContainer>
            <HelpCard onPress={() => handleShowQuestion(item)}>
              <Header>
                <Status answerd={item.answerd}>
                  {item.answerd ? 'Answred' : 'Pending'}
                </Status>
                <When>{item.formatedDate}</When>
              </Header>
              <Question numberOfLines={3}>{item.question}</Question>
            </HelpCard>
          </HelpContainer>
        )}
      />
    </Container>
  );
}
