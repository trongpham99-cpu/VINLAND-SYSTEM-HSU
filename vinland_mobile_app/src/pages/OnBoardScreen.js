import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useFonts } from "expo-font";

export default function OnBoardScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../fonts/Raleway-Regular.ttf"),
    Bold: require("../fonts/Raleway-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.background}
          source={require("../image/LogoV.png")}
        />
        <Text style={styles.title}>Chào mừng bạn đến với VinLand</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 38,
        }}
      >
        <Pressable onPress={() => navigation.navigate("LoginScreen")}>
          <View style={styles.btnLogin}>
            <Text style={styles.textLogin}>Đăng Nhập</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
          <View style={styles.btnRegis}>
            <Text style={styles.textRegis}>Đăng Ký</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("MenuScreen")}>
          <Text style={styles.textMenu}>Tiếp tục với tư cách khách</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontFamily: "Regular",
    marginTop: 14,
    textAlign: "center",
  },
  background: {
    width: 190,
    height: 140,
  },
  btnLogin: {
    height: 60,
    width: 300,
    backgroundColor: "#2D77EF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  btnRegis: {
    height: 60,
    width: 300,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "#2D77EF",
    borderWidth: 2,
    marginBottom: 14,
  },
  textLogin: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 24,
  },
  textRegis: {
    color: "#2D77EF",
    fontFamily: "Bold",
    fontSize: 24,
  },
  textMenu: {
    fontFamily: "Regular",
    fontSize: 20,
  },
});
