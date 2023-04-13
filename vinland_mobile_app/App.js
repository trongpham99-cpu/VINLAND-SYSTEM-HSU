import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//components
import OnBoardScreen from "./src/pages/OnBoardScreen";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="RegisterScreen" component={Register} />
        {/* <Stack.Screen name="MenuScreen" component={Menu} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
