import React, {useRef, useState, useEffect} from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';

import FilePickerManager from 'react-native-file-picker';

import {differenceInYears, parseISO} from 'date-fns';

import Button from '../../components/Button';
import api from '../../services/api';
import Axios from 'axios';
import {Container, Content, Division, Title, Strong, Text, Duo} from './styles';
import logo from '../../assets/salvus.png';

export default function Main({navigation}) {
  const [imgSource, setImgSource] = useState('');

  const [user, setUser] = useState(useSelector((state) => state.user.profile));
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    function loadUser() {
      const {birthday} = user;

      const age = differenceInYears(new Date(), parseISO(birthday));

      setUser({...user, age});
    }
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    uploadFile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  function pickFile() {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        setFile(response);
        console.tron.log(response);
      }
    });
  }

  async function uploadFile() {
    const data = new FormData();

    data.append('file', {
      fileName: file.fileName,
      uri: file.uri,
      path: file.path,
      type: file.type,
    });
    try {
      Axios({
        method: 'post',
        url: 'http://192.168.15.10:3333/files',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.tron.log(err);
    }
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
            <Strong>Especialidade: </Strong>
            <Text>{user.specialty}</Text>
          </Duo>
          <Duo>
            <Strong>Experiência: </Strong>
            <Text>{user.experience + ' anos'}</Text>
          </Duo>
          <Duo>
            <Strong>Localização: </Strong>
            <Text>{user.city + ' - ' + user.state}</Text>
          </Duo>
          <Duo>
            <Strong>Área de atuação: </Strong>
            <Text>{user.displacement + ' Km'}</Text>
          </Duo>
        </Division>

        <Division style={{borderBottomColor: '#ffffff00'}}>
          <Title>Arquivos</Title>
          <Duo>
            {file !== null ? (
              <Text>{'X arquivos'}</Text>
            ) : (
              <Text style={{position: 'relative', top: '5%', left: '400%'}}>
                Ainda não há arquivos
              </Text>
            )}
          </Duo>
        </Division>
      </Content>

      <Button title="Adicionar arquivo" onPress={() => pickFile()} />
    </Container>
  );
}
