import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";

export default function Login({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-ios"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <Text style={styles.txtIcon}>Đăng Nhập</Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image source={require("../../image/LogoV.png")} />
        <Text style={styles.tittle}>Chào mừng bạn đến với VinLand</Text>
      </View>
      <View>
        <View style={styles.inputEmail}>
          <Image
            style={{ width: 20, height: 20, marginHorizontal: 20 }}
            source={require("../../image/mail-inbox-app.png")}
          />
          <TextInput
            style={styles.txtInput}
            placeholder="Vui lòng nhập Email"
          />
        </View>
        <View style={styles.inputPassword}>
          <Image
            style={{ width: 20, height: 20, marginHorizontal: 20 }}
            source={require("../../image/padlock.png")}
          />
          <TextInput
            style={styles.txtInput}
            placeholder="Vui lòng nhập Mật Khẩu"
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 20,
            fontFamily: "Bold",
            fontSize: 16,
          }}
        >
          Quên mật khẩu?
        </Text>
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.btnLogin}>
            <Text style={styles.textLogin}>Đăng Nhập</Text>
          </View>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              fontFamily: "Bold",
              color: COLORS.tittleColor,
              fontSize: 16,
            }}
          >
            Chưa có tài khoản?
          </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                paddingLeft: 10,
                fontFamily: "Bold",
                fontSize: 16,
                color: COLORS.btnColor,
              }}
            >
              Đăng ký
            </Text>
          </Pressable>
        </View>
        {/* <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 38,
          }}
        >
          <Pressable onPress={() => navigation.navigate("#")}>
            <View style={styles.btnLogins}>
              <Image
                style={{ width: 30, height: 30, marginHorizontal: 20 }}
                source={require("../../image/facebook.png")}
              />
              <Text style={styles.txtLogins}>Đăng nhập bằng FaceBook</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("#")}>
            <View style={styles.btnLogins}>
              <Image
                style={{ width: 30, height: 30, marginHorizontal: 20 }}
                source={require("../../image/google.png")}
              />
              <Text style={styles.txtLogins}>Đăng nhập bằng Gmail</Text>
            </View>
          </Pressable>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerBtn: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#DADADA",
    borderWidth: 2,
    marginLeft: 30,
  },
  txtIcon: {
    marginLeft: 26,
    fontFamily: "Bold",
    fontSize: 24,
  },

  tittle: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    fontSize: 20,
    fontFamily: "Bold",
  },
  inputEmail: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
  },
  inputPassword: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    marginHorizontal: 30,
    borderRadius: 10,
  },
  txtInput: {
    width: 350,
    height: 50,
    alignItems: "center",
  },
  btnLogin: {
    height: 60,
    width: 350,
    backgroundColor: "#2D77EF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 10,
  },
  textLogin: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 18,
  },
  btnLogins: {
    height: 60,
    width: 350,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2D77EF",
    alignItems: "center",
    // justifyContent: "center",
    borderRadius: 30,
    marginBottom: 10,
  },
  txtLogins: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: 16,
  },
});
