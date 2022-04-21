import React from 'react';
import { Text,ScrollView } from 'react-native';

const ErrorScreen = (props) => {
    const error = props.route.params.error;
    console.log(error)
    return <ScrollView><Text>{ JSON.stringify(error)}</Text></ScrollView>
 
   
  
};
export default ErrorScreen;