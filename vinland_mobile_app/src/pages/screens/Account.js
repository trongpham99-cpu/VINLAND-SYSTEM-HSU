import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/colors";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();

export default function Account() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
