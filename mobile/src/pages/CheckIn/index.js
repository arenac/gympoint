import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { formatDistance, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  NewCheckinButton,
  List,
  CheckinContainer,
  CheckInText,
  When,
} from './styles';

export default function CheckIn() {
  const id = useSelector(state => state.auth.student.id);
  const [checkins, setCheckins] = useState([]);
  const [checkinLoading, setCheckingLoadin] = useState(false);

  useEffect(() => {
    async function fetchCheckins() {
      const response = await api.get(`students/${id}/checkins`);

      const data = response.data.map(checkin => {
        return {
          ...checkin,
          initialDateFormated: formatDistance(
            parseISO(checkin.createdAt),
            new Date(),
            { addSuffix: true, locale: en }
          ),
        };
      });

      setCheckins(data);
    }
    fetchCheckins();
  }, [id]);

  async function handleNewCheckin() {
    setCheckingLoadin(true);
    try {
      const response = await api.post(`students/${id}/checkins`);

      setCheckins(items => [
        {
          ...response.data,
          initialDateFormated: formatDistance(
            parseISO(response.data.createdAt),
            new Date(),
            { addSuffix: true, locale: en }
          ),
        },
        ...items,
      ]);
    } catch (err) {
      const { data } = err.response;
      if (data && data.error) {
        Alert.alert('Check-in failure', data.error);
      } else {
        Alert.alert(
          'Check-in failure',
          'Contact the admistrator to understan your problem.'
        );
      }
    }
    setCheckingLoadin(false);
  }

  const CheckinItem = ({ item }) => (
    <CheckinContainer>
      <CheckInText>{`Check-in #${item.id}`}</CheckInText>

      <When>{item.initialDateFormated}</When>
    </CheckinContainer>
  );

  return (
    <Container>
      <NewCheckinButton loading={checkinLoading} onPress={handleNewCheckin}>
        New check-in
      </NewCheckinButton>
      <List
        data={checkins}
        extraData={checkins}
        keyExtractor={(item, index) => index}
        renderItem={CheckinItem}
      />
    </Container>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="check-circle" size={20} color={tintColor} />
  ),
};
