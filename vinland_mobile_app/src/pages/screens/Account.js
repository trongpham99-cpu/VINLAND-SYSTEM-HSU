import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/colors";
import Login from "../screens/Login";
import Register from "../screens/Register";
import EditProfile from "./EditProfile";
import QRcode from "./QRcode";
import MyProduct from "./MyProduct";
import Profile from "./Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyPost from "./MyPost";

const Stack = createStackNavigator();

export default function Account({ navigation }) {
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
      const getToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      };
      getToken();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      {isLogin ? (
        <>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Qrcode" component={QRcode} />
          <Stack.Screen name="MyProduct" component={MyProduct} />
          <Stack.Screen name="MyPost" component={MyPost} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
