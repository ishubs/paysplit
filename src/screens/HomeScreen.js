import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button, Ol, Li} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { PermissionsAndroid } from 'react-native'
export default function HomeScreen({ navigation }) {

  

  const permission =()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(res => {
      console.log(res)
      console.log("requested")
    })    
  }  
  
  useEffect(()=>{
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(response => { 
      if (!response) {
        permission()
      }
     })
   },[])


  return (
    <View style={styles.container}>
      <View style={styles.containerr}>
        <><Text>1. Scan the QR code</Text></>
        <><Text>2. Select Contacts present with you</Text></>
        <><Text>3. Pay together</Text></>
        <Text style={styles.containerrr}>Note: Please make payments through PayTM only*</Text>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  containerr: {
    flex: 1,
    // backgroundColor: 'red',
    margin: '18%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  containerrr: {
    marginTop:"10%",
    
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 0,
  },
});
