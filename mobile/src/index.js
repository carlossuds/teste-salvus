import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import '~/config/ReactotronConfig';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './store';

import Routes from './routes';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar hidden={true} barStyle="dark-content" />
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
}
