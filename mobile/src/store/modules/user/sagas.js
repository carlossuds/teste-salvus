import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '../../../services/api';

import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    // eslint-disable-next-line camelcase
    const {name, email, ...rest} = payload.data;

    // eslint-disable-next-line prefer-object-spread
    const profile = Object.assign({name, email}, rest.oldPassword ? rest : {});

    const response = yield call(api.put, 'students', profile);
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro ao atualizar perfil', 'Verifique seus dados');
    yield put(updateProfileFailure());
  }
}

export function* uploadFileRequest({payload}) {
  try {
    const {data} = payload;

    console.tron.log(payload);

    yield call(api.post, 'files', data);
    Alert.alert('Sucesso');
  } catch (err) {
    console.tron.log(err);
    Alert.alert('Fail');
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPLOAD_FILE_REQUEST', uploadFileRequest),
]);
