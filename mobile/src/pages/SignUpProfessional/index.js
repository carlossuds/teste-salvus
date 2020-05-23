import React, {useState, useRef} from 'react';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {Form} from '@unform/core';

import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Title, Content, FormView, Duo, ToSignIn} from './styles';

import logo from '../../assets/salvus.png';

import {signUpRequest} from '../../store/modules/auth/actions';

export default function SignUpProfessional({route, navigation}) {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const {name, email, birthday, phone, password, repeat} = route.params;

  function handleSubmit({
    role,
    experience,
    specialty,
    city,
    state,
    displacement,
  }) {
    dispatch(
      signUpRequest(
        name,
        email,
        birthday,
        phone,
        password,
        repeat,
        role,
        experience,
        specialty,
        city,
        state,
        displacement,
      ),
    );
    navigation.navigate('SignIn');
  }

  return (
    <Container>
      <Image source={logo} resizeMode="contain" style={{width: 140}} />
      <Content>
        <Title>Dados Profissionais</Title>
        <FormView>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Duo>
              <Label title="Profissão" />
              <Input
                name="role"
                returnKeyType="next"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('specialty').focus()
                }
              />
            </Duo>
            <Duo>
              <Label title="Especialidade" />
              <Input
                name="specialty"
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current.getFieldRef('experience').focus();
                }}
              />
            </Duo>
            <Duo>
              <Label title="Anos de Experiência" />
              <Input
                name="experience"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current.getFieldRef('city').focus();
                }}
              />
            </Duo>
            <Duo>
              <Label title="Cidade" />
              <Input
                name="city"
                returnKeyType="next"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('state').focus()
                }
              />
            </Duo>
            <Duo>
              <Label title="Estado" />
              <Input
                name="state"
                returnKeyType="next"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('displacement').focus()
                }
              />
            </Duo>
            <Duo>
              <Label title="Deslocamento (em Km)" />
              <Input
                name="displacement"
                keyboardType="numeric"
                onSubmitEditing={() => formRef.current.submitForm()}
              />
            </Duo>
          </Form>
        </FormView>
      </Content>

      <Button title="Cadastrar" onPress={() => formRef.current.submitForm()} />

      <ToSignIn>{'      '}</ToSignIn>
    </Container>
  );
}
