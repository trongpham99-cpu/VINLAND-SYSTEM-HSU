import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import EditProfile from "./EditProfile";
import QRcode from "./QRcode";
import MyProduct from "./MyProduct";
import ListProduct from "./ListProduct";
import Profile from "./Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyPost from "./MyPost";
import { View, Text } from "react-native";

const Stack = createStackNavigator();

function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  )
}

export default function Account({ navigation }) {
  const [isLogin, setIsLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => { }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
      getToken();
    });

    return unsubscribe;
  }, [navigation]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    setLoading(false);
  };

  return loading ? (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      {
        isLogin ? (
          <>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Qrcode" component={QRcode} />
            <Stack.Screen name="MyProduct" component={MyProduct} />
            <Stack.Screen name="MyPost" component={MyPost} />
            <Stack.Screen name="ListProduct" component={ListProduct} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
    </Stack.Navigator >
  )
}
