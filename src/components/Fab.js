import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

export default function Fab({label,navigation}) {
  return (
    <FAB
      style={styles.fab}
      uppercase={false}
      label={label}
      icon="plus"
      onPress={() => 
        navigation.navigate('PaymentConfirmScreen')
      }
    />
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
