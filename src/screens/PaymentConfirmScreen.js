import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function PaymentConfirmScreen(props) {
  console.log(props.route.params.data)
  return (
    
    <View><Text>{props.route.params.data}</Text></View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
  },
});
