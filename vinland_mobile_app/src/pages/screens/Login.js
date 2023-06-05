import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from "react-native";
import Formik from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import { isValidObjField, updateError } from "../../services/methods";
import FormInput from "../../services/FormInput";
import { login } from "../../services/auth";
import { statusCode } from "../../constants/http/statusCodes";

export default function Login({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { username, password } = userInfo;
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Vui lòng nhập đầy đủ thông tin!", setError);
    if (username.length < 6)
      return updateError("Tài khoản phải dài hơn 6 ký tự", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password không hợp lệ!", setError);
    return true;
  };

  const submitForm = async () => {
    const { username, password } = userInfo;
    if (isValidForm()) {
      try {
        const res = await login(username, password);
        if (res["status"] == statusCode.OK) {
          //continue coding here....
          console.log("Login successfully");
        }
      } catch (err) {
        console.log("Error Login");
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        {error ? (
          <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        <FormInput
          // error={error}
          value={username}
          onChangeText={(value) => handleOnChangeText(value, "username")}
          source={require("../../image/mail-inbox-app.png")}
          placeholder="Vui lòng nhập tên của bạn"
        />
        <FormInput
          // error={error}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={(value) => handleOnChangeText(value, "password")}
          source={require("../../image/padlock.png")}
          placeholder="Vui lòng nhập mật khẩu của bạn"
        />
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
        <TouchableOpacity
          onPress={submitForm}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.btnLogin}>
            <Text style={styles.textLogin}>Đăng Nhập</Text>
          </View>
        </TouchableOpacity>
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
  // btnLogins: {
  //   height: 60,
  //   width: 350,
  //   flexDirection: "row",
  //   backgroundColor: "#fff",
  //   borderWidth: 2,
  //   borderColor: "#2D77EF",
  //   alignItems: "center",
  //   // justifyContent: "center",
  //   borderRadius: 30,
  //   marginBottom: 10,
  // },
  // txtLogins: {
  //   textAlign: "center",
  //   fontFamily: "Bold",
  //   fontSize: 16,
  // },
});
