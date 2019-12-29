import styled from 'styled-components/native';

export const Container = styled.View`
  flex 1;
  padding: 0 20px;
  background: #ddd;
  height: 100%;
`;

export const Card = styled.View`
  background: #fff;
  margin-top: 25px;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #aaa;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Type = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const When = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Text = styled.Text`
  font-size: 14px;
  margin-bottom: 15px;
`;
