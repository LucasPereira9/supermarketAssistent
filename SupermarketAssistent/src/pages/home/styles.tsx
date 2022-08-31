import styled from 'styled-components/native';
import 'styled-components';

export const Container = styled.View`
  flex: 1;
  background: #ffffff;
  align-items: center;
`;
export const Header = styled.View`
  min-width: 100%;
  height: 22%;
  background-color: ${({theme}: {theme: any}) => theme.colors.primary};
  justify-content: space-between;
  align-items: center;
  padding: 10%;
  flex-direction: row;
`;

export const TabContainer = styled.View`
  min-width: 100%;
  height: 16%;
  background-color: ${({theme}: {theme: any}) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const SelectValue = styled.View`
  width: 31%;
  left: 30%;
  border-width: 1px;
  border-color: ${({theme}: {theme: any}) => theme.colors.primary};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;
export const EmptyView = styled.View`
  height: 34%;
  align-items: center;
  top: 60px;
`;
