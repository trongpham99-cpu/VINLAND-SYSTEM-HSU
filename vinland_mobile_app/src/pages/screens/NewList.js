import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Components
import News from "./News";
import NewsDetailScreen from "./NewsDetailScreen";
import AdminScreen from "./AdminScreen";

const Stack = createStackNavigator();
export default function NewNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="News"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
}
