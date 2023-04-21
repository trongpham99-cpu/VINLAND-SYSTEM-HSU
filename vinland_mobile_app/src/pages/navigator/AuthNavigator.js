import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Components
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();
export default function AuthNavigator() {
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
