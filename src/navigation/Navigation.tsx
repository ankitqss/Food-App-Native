import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { View, Text } from 'react-native';
import SplashScreen from '@features/auth/SplashScreen';
import LoginScree from '@features/auth/LoginScreen';
import LoginScreen from '@features/auth/LoginScreen';
import { navigationRef } from '@utils/NavigationUtils';

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{ animation: 'fade' }}
          name="LoginScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
