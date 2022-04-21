import React,{useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';
import TabNavigator from './TabNavigator';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { navigationRef } from './RootNavigation';

export default function Routes() {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
    
    useEffect(() => {
      messaging()
        .getToken(firebase.app().options.messagingSenderId)
        .then(x => console.log(x))
        .catch(e => console.log(e));
      
        // createNotificationLnrs();
    }, []);
    
    if (initializing) return null;
  
    
    
  return (<NavigationContainer ref={navigationRef}>{user ? <TabNavigator /> : <AuthStack />  }</NavigationContainer>
    
  );
}
