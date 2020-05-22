import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: space-around;
`;

export const Title = styled.Text`
  font-family: 'Raleway-Bold';
  font-size: 30px;
  margin-bottom: 5%;
  color: #138a72;
`;

export const Content = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
`;

export const FormView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: true,
  persistentScrollbar: true,
})`
  width: 80%;
  padding: 10px;
`;

export const Duo = styled.View`
  margin-bottom: 15%;
  height: 50px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

export const ToSignIn = styled.Text`
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  color: #138a72;
  font-family: 'Raleway-Regular';
`;
