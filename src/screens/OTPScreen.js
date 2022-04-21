import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native'
import { TextInput, Button, Flex, Text } from "@react-native-material/core";
import auth from '@react-native-firebase/auth';
import { View } from "react-native"
import {navigation} from "@react-navigation"
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { Stack, ActivityIndicator } from "@react-native-material/core";
// import { database } from 'firebase';
import { Dimensions, KeyboardAvoidingView } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

export default function OTPScreen({confirm}) {
  const [Loading, setLoading] = useState(false)
  useEffect(() => {
    
  }, []);

  // If null, no SMS has been sent
  const [token, setToken] = useState('')
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('')
  const [codeconfirm, setcodeconfirm] = useState(null)
  // Handle the button press
 

  async function confirmCode() {
    try {
      let response = await confirm.confirm(code);
      if(response)
      setcodeconfirm(true)
    } catch (error) {
      console.log('Invalid code.'+ error);
    }
  }


  
  return (
    <View style={styles.scene}>
      <TextInput style={{ marginTop: deviceHeight / 3.5 }} keyboardType="decimal-pad" value={code} onChangeText={text => setCode(text)} variant="outlined" label="OTP"/>
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    margin: "5%",
    justifyContent: "center"
  },
  btn: {
    
  }
  
});