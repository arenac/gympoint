import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.View`
  flex 1;
  padding: 0 20px;
  background: #ddd;
`;

export const NewHelpQuestion = styled(Button)`
  margin: 25px 0 15px 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 100%;
`;

export const HelpContainer = styled.View`
  flex: 1;
  background: #fff;
  margin-top: 10px;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #aaa;
`;

export const HelpCard = styled(TouchableOpacity)``;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Status = styled.Text`
  color: ${props => (props.answerd ? '#42CB59' : '#999')}
  font-size: 14px;
  font-weight: bold;
  margin-left: 15px;
`;

export const When = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Question = styled.Text`
  font-size: 14px;
`;
