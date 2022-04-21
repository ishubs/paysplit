import React, {useState} from 'react';
import {View, FAB } from 'react-native';
import RNUpiPayment from 'react-native-upi-payment';
import { TextInput, Button, Flex, Text } from "@react-native-material/core";
import { NativeModules } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { navigationRef } from '../navigation/RootNavigation';

const UpiModule = NativeModules.UpiPayment;
const UPIpay = (props) => {
console.log(JSON.stringify(props))
const [UPIString, setUPIString] = useState('')
console.log(JSON.stringify(props+"propssssss"))
function successCallback(data)
{
    console.log(data + " Success")

    pushTransactionToFirebase()
    props.navigation.navigate('PaymentConfirmScreen',{data:"success"})
}          
    

  
function failureCallback(data)
{
    console.log(data + " Failure")
    pushTransactionToFirebase()
    props.navigation.navigate('PaymentConfirmScreen',{data:"failure"})

}          
   
    // const user = ;
    // console.log(auth().currentUser)
    function pushTransactionToFirebase() {
        const now = new Date();
        // const transName = now.getTime().toLocaleString()
        // console.log(transName+"transname.........")
        console.log("............")
        const user = auth().currentUser.phoneNumber;
        // const sendingData = selectedContacts
        // sendingData.push(user)
        firestore().collection('tokens').doc(user).collection('transactions')
          .add({
          transactionID:"",
          amount: props.route.params.Amount?  props.route.params.Amount: props.route.params.uri.split('&am=')[1]
            }).then(() => {console.log('Transaction Added!')}).catch(e => console.log(e));
      }

    return (
        <View style={{flex:1, backgroundColor:'lightblue', justifyContent:'center', alignItems:'center'}}>
            <Text>Please pay through Paytm</Text>
            {/* <Text>{props.route.params.data.payeeName}</Text> */}
            {/* <Text>${props.route.params.Amount }</Text> */}
            <Button onPress={()=>{
                // RNUpiPayment.initializePayment({
                //     vpa: props.route.params.data.vpa, // or can be john@ybl or mobileNo@upi
                //     payeeName: props.route.params.data.payeeName,
                //     amount: props.route.params.data.amount,
                //     transactionRef: 'aasf-132-mori-fn'
                //   }, successCallback, failureCallback);
          const upiConfig = {}
          console.log(JSON.stringify(props.route.params.uri)+"this is params")
          console.log(JSON.stringify(props.route.params.ScanResult + "this is scanresult"))
          
                // upiConfig.upiString = `upi://pay?pa=paytmqr2810050501011wm6vuqco6jd@paytm&pn=Paytm%20Merchant&mc=5499&mode=02&orgid=000000&paytmqr=2810050501011WM6VUQCO6JD&am=24`;
          const uripart1 = props.route.params.ScanResult != undefined ? props.route.params.ScanResult : props.route.params.uri
                const uripart2 = props.route.params.Amount ? `&am=${props.route.params.Amount}` : '';
          console.log("uri part1" + uripart1)
          console.log("uri part2" + uripart2)
          console.log(uripart2+uripart1)
                upiConfig.upiString = uripart1 + uripart2;
                setUPIString(upiConfig)
          console.log(JSON.stringify(upiConfig)+"upiconfig")
          
                UpiModule.intializePayment(upiConfig, successCallback, failureCallback);
                // UpiModule.intializePayment()
            // }} title={`Pay ₹${props.route.params ? props.route.params.Amount : UPIString.split('&am=')[1]}`}/>
        }} title={`pay ₹${props.route.params.Amount?  props.route.params.Amount: props.route.params.uri.split('&am=')[1]}` }/>
        </View>
    )
}

export default UPIpay;