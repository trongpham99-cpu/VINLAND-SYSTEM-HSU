import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import BottomNavigator from "./src/pages/navigator/BottomNavigator";
import { StatusBar } from "react-native";
import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications
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
