import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Components

import Home from "./Home";
import DetailScreen from "./DetailsScreen";

const Stack = createStackNavigator();
export default function ProductNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name ="Home"component={Home}/>
      <Stack.Screen name ="DetailScreen" component={DetailScreen}/>
    </Stack.Navigator>
  );
}
