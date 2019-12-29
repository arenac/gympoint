import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 20px;
  background: #ddd;
`;

export const NewCheckinButton = styled(Button)`
  margin: 25px 0 15px 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 10,
  },
})`
  flex: 1;
  height: 100%;
`;

export const CheckinContainer = styled.View`
  flex: 1;
  background: #fff;
  margin-top: 10px;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #aaa;

  flex-direction: row;
  justify-content: space-between;
`;

export const CheckInText = styled.Text`
  font-weight: bold;
`;

export const When = styled.Text`
  color: #999;
`;
