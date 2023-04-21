import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
      initialRouteName="Trang chủ"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Trang chủ"
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
        name="Tin tức"
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
        name="Tài khoản"
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
