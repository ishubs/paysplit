import React, {useEffect} from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import QRcode from '../screens/QRcode';
import UPIpay from '../screens/UPIpay';
import PaymentConfirmScreen from '../screens/PaymentConfirmScreen'
import WalletScreen from '../screens/WalletScreen'
import  ErrorScreen from "../screens/ErrorScreen"
const Stack = createStackNavigator();

export default function PaymentStack({navigation}) {
  

  return (
    
    <Stack.Navigator>
      <Stack.Screen name="QRcode" component={QRcode} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
      <Stack.Screen name="UPIpay" component={UPIpay} />
      <Stack.Screen name="PaymentConfirmScreen" component={PaymentConfirmScreen}/>
    </Stack.Navigator>
  );
}
