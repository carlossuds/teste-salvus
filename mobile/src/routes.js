import React from 'react';
import {useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';
import SignUpPersonal from '~/pages/SignUpPersonal';
import SignUpProfessional from '~/pages/SignUpProfessional';
import Main from '~/pages/Main';

const Stack = createStackNavigator();

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!signed && (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUpPersonal" component={SignUpPersonal} />
            <Stack.Screen
              name="SignUpProfessional"
              component={SignUpProfessional}
            />
          </>
        )}
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
