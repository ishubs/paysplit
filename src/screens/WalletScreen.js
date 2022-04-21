import React, { Component, useEffect, useState } from "react";
import {
  
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CheckBox from "@react-native-community/checkbox";
import { FAB } from "react-native-paper";
import { Stack, ActivityIndicator, TextInput } from "@react-native-material/core";
import ErrorScreen from "./ErrorScreen"
import Contacts from "react-native-contacts";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
function WalletScreen(props) {
  const navigation = useNavigation();
  const [contacts, setcontacts] = useState([]);
  const [data, setdata] = useState([]);
  const [selectedContacts, setselectedContacts] = useState([]);
  const [Amount, setAmount] = useState("");
  const [Loading , setLoading ] = useState(true)
const [err, seterr] = useState(null)
  useEffect(() => {
    
  fetchContacts()
    
  }, [])
  

  

console.log(JSON.stringify(props.route.params.data))
  function sendPaymentNotification() {
    const numsData = {
      numbers: selectedContacts,
      uri: props.route.params.data + `&am=${Amount / (selectedContacts.length+1)}`,
    };
    axios
      .post(
        "https://api.letspay.live/api/selectcontacts",
        numsData,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
          },
        }
      )
      .then(() => {
        // pushTransactionToFirebase()
        console.log(props.route.params + "paramsss")
        console.log(selectedContacts)
        navigation.navigate("UPIpay", {
          ScanResult: props.route.params.data,
          Amount: Amount/(selectedContacts.length+1),
        })}
      );
  }

  function removeDuplicateObjectFromArray(array, key) {
    var check = new Set();
    return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
  }

 
  async function makingContactObj(contacts) {
    const realContacts = [];
    for (let i = 0; i < contacts.length; i++) {
      if (
        contacts[i].phoneNumbers[0] != undefined &&
        contacts[i].displayName != undefined
      ) {
        contacts[i].phoneNumbers[0].number = contacts[i].phoneNumbers[0].number.split(" ").join("").split("-").join("").split(")").join("").split("(").join("");

        if (contacts[i].phoneNumbers[0].number.length > 10) 
        contacts[i].phoneNumbers[0].number = contacts[i].phoneNumbers[0].number.substring(3, 13);
        
        if (contacts[i].phoneNumbers[0].number.length == 10)
          realContacts.push({
            // id: i,
            phone: contacts[i].phoneNumbers[0].number,
            name: contacts[i].displayName,
          });
      }
    }
    return realContacts;
  }

  async function removeDuplicateObjectFromArray(array, key) {
    var check = new Set();
    return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
  }

  const fetchContacts = () => {
      Contacts.getAll().then(async (fcontacts) => {
      const rcontacts = await makingContactObj(fcontacts);
      const filtered = await removeDuplicateObjectFromArray(rcontacts, "phone");
      postExample(filtered);
    });
  };

  const postExample = async (contactslist) => {
    const data = { contacts: contactslist };
    console.log(data.contacts.length);
    console.log(data)
    axios
      .post(
        "https://api.letspay.live/api/contactsync",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        setdata(res.data)
      }).catch(err => {
        console.log(err)
        seterr(err)
      });
  };

  if (err) navigation.navigate('ErrorScreen',{error:err})

  if (Loading)
    return <ScrollView><ActivityIndicator color="#00ff00" size="large" /><Text>Fetching Contacts</Text></ScrollView>

  return (
    <View>
      <TextInput title="Amount"  keyboardType="numeric" value={Amount} onChangeText={(text) => setAmount(text)} />
      {/* <Button
        onPress={() => {
          fetchContacts();
        }}
        title="send to server"
      /> */}
      <ScrollView style={{ margin: 30 }}>
        <View style={{ height: 40 }} />
        {data.map(({ phone, name }) => (
          <View key={phone} style={{ display: "flex", flexDirection: "row" }}>
            <CheckBox
              title={name}
              disabled={false}
              value={
                selectedContacts.find((number) => number == phone)
                  ? true
                  : false
              }
              onValueChange={() => {
                console.log("selected")
                console.log(selectedContacts.length)
                selectedContacts.find((number) => number == phone) ?
                  setselectedContacts(selectedContacts.filter((number) => number != phone))
                  : setselectedContacts([...selectedContacts, phone])
                console.log(selectedContacts.length)
              }
                
              }
            />
            <Text>{name}</Text>
          </View>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        uppercase={false}
        label={"Next"}
        icon="plus"
        onPress={() => sendPaymentNotification()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 25,
    right: 0,
    bottom: 0,
  },
});

export default WalletScreen;
