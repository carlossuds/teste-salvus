import React, {useState, useRef} from 'react';
import {Image, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Form} from '@unform/core';

import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Title, Content, FormView, Duo, ToSignIn} from './styles';

import logo from '../../assets/salvus.png';

export default function SignUpPersonal({navigation}) {
  const formRef = useRef(null);

  function handleSubmit({name, email, birthday, phone, password, repeat}) {
    navigation.navigate('SignUpProfessional', {
      name,
      email,
      birthday,
      phone,
      password,
      repeat,
    });
  }

  return (
    <Container>
      <Image source={logo} resizeMode="contain" style={{width: 140}} />
      <Content>
        <Title>Dados Pessoais</Title>
        <FormView>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Duo>
              <Label title="Nome" />
              <Input
                name="name"
                returnKeyType="next"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('email').focus()
                }
              />
            </Duo>
            <Duo>
              <Label title="E-mail" />
              <Input
                name="email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current.getFieldRef('birthday').focus();
                }}
              />
            </Duo>
            <Duo>
              <Label title="Data de nascimento" />
              <Input
                name="birthday"
                keyboardType="phone-pad"
                placeholder="DD/MM/AAAA"
                returnKeyType="next"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('phone').focus()
                }
              />
            </Duo>

            <Duo>
              <Label title="Telefone" />
              <Input
                name="phone"
                placeholder="(xx) x xxxx-xxxx"
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('password').focus()
                }
              />
            </Duo>
            <Duo>
              <Label title="Senha" />
              <Input
                name="password"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('repeat').focus()
                }
              />
            </Duo>
            <Duo>
              <Label title="Repetir senha" />
              <Input
                name="repeat"
                secureTextEntry
                onSubmitEditing={() => formRef.current.submitForm()}
              />
            </Duo>
          </Form>
        </FormView>
      </Content>

      <Button title="Continuar" onPress={() => formRef.current.submitForm()} />

      <ToSignIn onPress={() => navigation.goBack()}>
        Já tem uma conta? Conecte-se
      </ToSignIn>
    </Container>
  );
}
