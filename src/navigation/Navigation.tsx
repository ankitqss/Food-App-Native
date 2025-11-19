import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { View, Text } from 'react-native';
import SplashScreen from '@features/auth/SplashScreen';
import LoginScree from '@features/auth/LoginScreen';
import LoginScreen from '@features/auth/LoginScreen';
import { navigationRef } from '@utils/NavigationUtils';
import UserBottomTab from '@features/tabs/UserBottomTab';
import AnimatedTabs from '@features/tabs/AnimatedTabs';

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ animation: 'fade', headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            animation: 'fade',
            headerShown: false,
          }}
          name="UserBottomTab"
          component={AnimatedTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
