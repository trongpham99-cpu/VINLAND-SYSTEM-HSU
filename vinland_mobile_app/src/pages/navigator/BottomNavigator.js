import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
//Components
import News from "../screens/News";
import Account from "../screens/Account";
import ProductNavigator from "../screens/Product";
import ChatNavigator from "../screens/ChatHub";
import NewNavigator from "../screens/NewList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function BottomNavigator(props) {
  console.log("props: ", props);
  const [isLogin, setIsLogin] = React.useState(false);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  };

  React.useEffect(async () => {
    let token = await getToken();
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);


  return (
    <Tab.Navigator
      initialRouteName="Trang chủ"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={ProductNavigator}
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
        component={NewNavigator}
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
      {
        isLogin ? (
          <Tab.Screen
            name="Chatting"
            component={ChatNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="chatbox"
                  size={24}
                  color={focused ? "#2D77EF" : "#9E9E9E"}
                />
              ),
            }}
          />) : null
      }
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
