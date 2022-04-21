
import React, { useState } from 'react';
import { Button, View, TextInput, Text, Linking } from 'react-native';
import auth from "@react-native-firebase/auth"

export default function SettingsScreen({ navigation }) {
    const [inputCounter, setinputCounter] = useState(0)
    return (
      <View style={{ flex: 1, justifyContent:'space-evenly', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Button onPress={()=> Linking.openURL('https://letspay.typeform.com/to/hEg14hYc')} title="Feedback"/>
            <Button onPress={()=>{ auth().signOut().then(() => console.log('User signed out!'))}} title="Log out"/>
      </View>
    );
  }