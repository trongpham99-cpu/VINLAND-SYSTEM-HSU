import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/colors";
import Login from "../screens/Login";
import Register from "../screens/Register";
import EditProfile from "./EditProfile";
import QRcode from "./QRcode";
import Rule from "./Rule";
import Profile from "./Profile";

const Stack = createStackNavigator();

export default function Account() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Qrcode" component={QRcode} />
      <Stack.Screen name="Rule" component={Rule} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
