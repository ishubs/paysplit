import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native'
import { TextInput, Button, Flex, Text } from "@react-native-material/core";
import auth from '@react-native-firebase/auth';
import { View } from "react-native"
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { Stack, ActivityIndicator } from "@react-native-material/core";
// import { database } from 'firebase';
import OTPScreen from "./OTPScreen"
import { Dimensions, KeyboardAvoidingView } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
export default function PhoneSignIn() {
  const [Loading, setLoading] = useState(false)
  useEffect(() => {
    
  }, []);

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(false);
  const [token, setToken] = useState('')
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('')
  const [codeconfirm, setcodeconfirm] = useState(null)
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    if (confirm) {
      setLoading(false)
    }
  }

  async function confirmCode() {
    try {
      let response = await confirm.confirm(code);
      if(response)
      setcodeconfirm(true)
    } catch (error) {
      console.log('Invalid code.'+ error);
    }
  }

  if (!confirm) {
    return (
      <View style={styles.scene}>
        <ScrollView>
          <KeyboardAvoidingView enabled >
            <TextInput style={{ marginTop: deviceHeight / 3.5 }} value={phone}
              onChangeText={text => {
                if(phone.length>10) return
                setLoading(false)
                setPhone(text)
              }} variant="outlined" label="Phone Number" keyboardType="numeric"
        returnKeyType='done'
            />
        <Button
          // style={ }
          disabled={Loading}
        title={Loading?<ActivityIndicator color="#00ff00"/>: "Log in"}
          onPress={() => {
            setLoading(true)
            signInWithPhoneNumber('+91' + phone)
            messaging()
            .getToken(firebase.app().options.messagingSenderId)
            .then(token => {
              // setToken(token)
              firestore()
                  .collection('tokens')
                  .doc("+91"+phone)
                  .set({
                    token: token,
                    phoneNumber: "+91"+phone,
                  })
                  .then(() => {
                    console.log('User added!');
//check if the user already exists, if user doesn't exist then add 
                  });
            })
            .catch(e => console.log(e));
            
            
          }}
            />
            </KeyboardAvoidingView>
          </ScrollView>
      </View>
    );
  }

  return (
    <OTPScreen confirm={confirm }/>
  )
  
}

const styles = StyleSheet.create({
  scene: {
    margin: "5%",
    justifyContent: "center"
  },
  btn: {
    
  }
  
});