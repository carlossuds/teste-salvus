import React, {useRef, useState, useEffect} from 'react';
import {Image, TouchableOpacity, ScrollView} from 'react-native';
import {Form} from '@unform/core';

import MiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OcIcon from 'react-native-vector-icons/Octicons';
import FeIcon from 'react-native-vector-icons/Feather';

import Label from '../../components/Label';
import Input from '../../components/Input';

import api from '~/services/api';

import {Container, FormView, InputDiv, List, Item} from './styles';

import logo from '../../assets/salvus.png';

export default function Main({navigation}) {
  const formRef = useRef(null);

  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      const response = await api.get('/todos');
      formRef.current.reset();
      setTodos(response.data);
    }
    loadTodos();
    console.tron.log(todos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  async function handleSubmit({title}) {
    try {
      await api.post('/todos', {title: title});
      setRefresh(!refresh);
    } catch (err) {}
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/todos/${id}`);
      setRefresh(!refresh);
    } catch (err) {}
  }

  return (
    <Container>
      <TouchableOpacity
        style={{position: 'absolute', left: '90%', top: '1%'}}
        onPress={() => navigation.navigate('ImageEditor')}>
        <FeIcon name="image" size={20} color="#138a72" />
      </TouchableOpacity>

      <Image
        source={logo}
        resizeMode="contain"
        style={{height: 80, width: 80, marginTop: '15%'}}
      />

      <FormView>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Label title="What do you have to do?" />
          <InputDiv>
            <Input
              id="title"
              name="title"
              onSubmitEditing={() => formRef.current.submitForm()}
              style={{paddingRight: 25}}
            />
            <MiIcon
              name="send"
              color="#138a72"
              size={22}
              style={{position: 'relative', left: -20}}
              onPress={() => formRef.current.submitForm()}
            />
          </InputDiv>
        </Form>
      </FormView>

      <List>
        <ScrollView style={{height: '100%'}}>
          {todos.map((todo) => (
            <Item key={todo._id}>
              <Label title={todo.title} />
              <OcIcon
                name="x"
                size={22}
                color="#138a72"
                style={{position: 'relative', left: -20}}
                onPress={() => handleDelete(todo._id)}
              />
            </Item>
          ))}
        </ScrollView>
      </List>
    </Container>
  );
}
