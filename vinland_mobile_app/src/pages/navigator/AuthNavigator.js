import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Components
import Login from "../screens/Login";
import OnBoardScreen from "../screens/OnBoardScreen";
import Register from "../screens/Register";
import BottomNavigator from "./BottomNavigator";

const Stack = createStackNavigator();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OnBoardScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen
        name="HomeScreen"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
