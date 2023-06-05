import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Components

import Home from "./Home";
import DetailScreen from "./DetailScreen";
import HomePopular from "./HomePopular";
import HomeNearest from "./HomeNearest";
// import ChatNavigator from "./ChatHub";
import ChatDetail from "./ChatDetail";
const Stack = createStackNavigator();
export default function ProductNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="HomePopular" component={HomePopular} />
      <Stack.Screen name="HomeNearest" component={HomeNearest} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
    </Stack.Navigator>
  );
}
