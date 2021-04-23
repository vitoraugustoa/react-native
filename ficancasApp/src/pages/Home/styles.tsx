import styled from 'styled-components/native';


export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.View`
  margin: 0px 0px 25px 15px;
`;

export const Nome = styled.Text`
  font-size: 19px;
  color: #FFF;
  font-style: italic;
`;

export const Saldo = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #FFF;
  font-weight: bold;
`;

export const Title = styled.Text`
  margin: 0px 0px 10px 15px;
  color: #00b94a;
`;

export const List = styled.FlatList.attrs({
  marginHotizontal: 15
})`
  padding-top: 15px;
  background-color: #FFF;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin: 0px 8px;
`;

export const Area = styled.View`
  flex-direction: row;
  margin-left: 15px;
  align-items: baseline;
`;