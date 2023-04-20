import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
//Components
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import News from "../screens/News";
import Account from "../screens/Account";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2D77EF",
        tabBarInactiveTintColor: "#9E9E9E",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="home"
                size={24}
                color={focused ? "#2D77EF" : "#9E9E9E"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="newspaper"
              size={24}
              color={focused ? "#2D77EF" : "#9E9E9E"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="chatbox"
              size={24}
              color={focused ? "#2D77EF" : "#9E9E9E"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person-circle-outline"
              size={24}
              color={focused ? "#2D77EF" : "#9E9E9E"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
