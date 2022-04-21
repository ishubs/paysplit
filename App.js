import React, { useEffect } from "react";
import Providers from "./src/navigation";
import messaging from "@react-native-firebase/messaging";
import UPIpay from "./src/screens/UPIpay";
import axios from "axios"
import * as RootNavigation from './src/navigation/RootNavigation';
export default function App() {
  // const checkper = async function checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //     // getToken();
  //     console.log("Permission Granted");
  //   } else {
  //     // requestPermission();
  //     console.log("Permission Denied");
  //   }
  // };

  useEffect(() => {
    // checkper();
    // createNotificationLnrs();
    // SplashScreen.hide();
  }, []);


  // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   const data = remoteMessage.data
  //   console.log(data)
  //   // navigation.navigate('UPIpay', { data })
  //   console.log("Background Message Handler Activated \n")
  //   // console.log(JSON.stringify(navigation)+ " \n Navigation Object HomeScreen")
  //   // navigation.navigate('UPIpay', { uri:data.uri })
  //   // navigation.navigate('PaymentStack', {
  //   //   screen: 'UPIpay',
  //   //   params: { uri: data.uri }
  //   // });

  // });

  



    

   
   

    return <Providers />;
  

}