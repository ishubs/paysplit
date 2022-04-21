import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneSignIn from '../screens/LoginScreen';
import {View } from "react-native"
import OTPScreen from '../screens/OTPScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    
      <Stack.Navigator>
    <Stack.Screen name="Login" component={PhoneSignIn} />
    <Stack.Screen name="OTPScreen" component={OTPScreen} />
      </Stack.Navigator>

    
  );
}
