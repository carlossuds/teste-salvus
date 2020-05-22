import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import {parse} from 'date-fns';
import api from '../../../services/api';
// import history from '~/services/history';
import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Auth failed,check your information');
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {
      name,
      email,
      birthday,
      phone,
      password,
      repeat,
      role,
      experience,
      city,
      state,
    } = payload;

    console.tron.log(payload);

    if (repeat !== password) throw 'Passwords dont match';

    let newBDay = birthday.split('/').reverse().join('-');

    console.tron.log(typeof newBDay);
    console.tron.log(newBDay);

    yield call(api.post, 'users', {
      name,
      email,
      birthday: newBDay,
      phone,
      password,
      role,
      experience,
      city,
      state,
    });
    Alert.alert('Great! You can Sign in now');
  } catch (err) {
    Alert.alert('Registration failed');
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
