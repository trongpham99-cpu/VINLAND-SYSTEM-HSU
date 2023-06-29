import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import axios from "axios";
//components
import BottomNavigator from "./src/pages/navigator/BottomNavigator";
import { StatusBar } from "react-native";
import { useEffect } from "react";

export default function App() {
  let [fontsLoaded] = useFonts({
    Regular: require("./src/constants/fonts/Raleway-Regular.ttf"),
    Bold: require("./src/constants/fonts/Raleway-Bold.ttf"),
    SemiBold: require("./src/constants/fonts/Raleway-SemiBold.ttf"),
    Thin: require("./src/constants/fonts/Raleway-Thin.ttf"),
    Medium: require("./src/constants/fonts/Raleway-Medium.ttf"),
    Italic: require("./src/constants/fonts/Raleway-Italic.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      {/* <AuthNavigator /> */}
      <BottomNavigator />
    </NavigationContainer>
  );
}
