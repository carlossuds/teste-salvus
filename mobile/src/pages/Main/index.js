import React, {useRef, useState, useEffect} from 'react';
import {Image, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import {differenceInYears, parseISO} from 'date-fns';

import Button from '../../components/Button';
import api from '~/services/api';
import {Container, Content, Division, Title, Strong, Text, Duo} from './styles';
import logo from '../../assets/salvus.png';

export default function Main({navigation}) {
  const [imgSource, setImgSource] = useState('');

  const [user, setUser] = useState(useSelector((state) => state.user.profile));
  const [files, setFiles] = useState(null);

  useEffect(() => {
    function loadUser() {
      const {birthday} = user;

      const age = differenceInYears(new Date(), parseISO(birthday));

      setUser({...user, age});
    }
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pickImage() {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        setImgSource(source);
      }
    });
  }

  return (
    <Container>
      <Image
        source={logo}
        resizeMode="contain"
        style={{height: 140, width: 140}}
      />

      <Content>
        <Division>
          <Title>Dados Pessoais</Title>
          <Duo>
            <Strong>Nome: </Strong>
            <Text>{user.name}</Text>
          </Duo>
          <Duo>
            <Strong>Idade: </Strong>
            <Text>{user.age}</Text>
          </Duo>
          <Duo>
            <Strong>Telefone: </Strong>
            <Text>{user.phone}</Text>
          </Duo>
          <Duo>
            <Strong>Email: </Strong>
            <Text>{user.email}</Text>
          </Duo>
        </Division>

        <Division>
          <Title>Dados Profissionais</Title>
          <Duo>
            <Strong>Profissão: </Strong>
            <Text>{user.role}</Text>
          </Duo>
          <Duo>
            <Strong>Experiência: </Strong>
            <Text>{user.experience}</Text>
          </Duo>
          <Duo>
            <Strong>Localização: </Strong>
            <Text>{user.city + ' - ' + user.state}</Text>
          </Duo>
        </Division>

        <Division style={{borderBottomColor: '#ffffff00'}}>
          <Title>Arquivos</Title>
          <Duo>
            {files !== null ? (
              <Text>{files.length + ' arquivos'}</Text>
            ) : (
              <Text style={{position: 'relative', top: '10%', left: '400%'}}>
                Ainda não há arquivos
              </Text>
            )}
          </Duo>
        </Division>
      </Content>

      {imgSource === '' && (
        <Button title="Adicionar arquivo" onPress={() => pickImage()} />
      )}
    </Container>
  );
}
