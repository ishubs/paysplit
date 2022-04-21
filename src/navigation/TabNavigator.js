import * as React from "react";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./../screens/HomeScreen";
import messaging from "@react-native-firebase/messaging";
import * as RootNavigation from "./RootNavigation";
import PaymentStack from "./PaymentStack";
import SettingsScreen from "./../screens/SettingsScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    createNotificationLnrs();
  });

  const createNotificationLnrs = async function createNotificationListeners() {
    // Triggered for data only payload in foreground

    messaging().onMessage((message) => {
      //process data message
      const data = message.data;
      console.log("foreground message listener running ....");
      console.log(JSON.stringify(message) + " message");
      RootNavigation.navigate("Scan QR", {
        screen: "UPIpay",
        params: {
          uri: data.uri,
        },
      });
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const data = remoteMessage.data;
      console.log("Background Message Handler Activated \n");
      RootNavigation.navigate("Scan QR", {
        screen: "UPIpay",
        params: { uri: data.uri },
      });
    });

    // If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:

    const notificationOpen = await messaging().getInitialNotification();

    if (notificationOpen) {
      console.log(notificationOpen);
      RootNavigation.navigate("Scan QR", {
        screen: "UPIpay",
        params: {
          uri: notificationOpen.data.uri,
        },
      });
    }
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Scan QR") {
            iconName = focused ? "qr-code" : "qr-code-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3A86FF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} navigation IconButton />
      <Tab.Screen
        name="Scan QR"
        component={PaymentStack}
        navigation
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} navigation />
    </Tab.Navigator>
  );
}
