import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${Platform.OS === "ios" ? "#00000066" : "transparent"};
  position: absolute;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  align-items: flex-end;
  background-color: white;
  border-bottom-width: 1px;
  border-color: grey;
`;