import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../services/methods";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import client from "../../api/client";
import FormInput from "../../services/FormInput";
import { register } from "../../services/auth";
import { statusCode } from "../../constants/http/statusCodes";

export default function Register({ navigation }) {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });
  const { username, email, password } = userInfo;
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Vui lòng nhập đầy đủ thông tin!", setError);
    if (!username.trim() || username.length < 6)
      return updateError("Tên không hợp lệ", setError);
    if (!isValidEmail(email))
      return updateError("Email không hợp lệ", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password không nhỏ hơn 8 kí tự!", setError);
    // if (password !== confirmPassword)
    //   return updateError("Password không trùng khớp", setError);
    return true;
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .min(3, "Ten khong hop le!")
      .required("Vui long nhap ten!"),
    email: Yup.string()
      .email("Email khong hop le")
      .required("Vui long nhap Email"),
    password: Yup.string()
      .trim()
      .min(8, "Password khong hop le")
      .required("Vui long nhap Password"),
    confirmPassword: Yup.string().equals(
      [Yup.ref("password"), null],
      "Password khong trung khop"
    ),
  });

  const submitForm = async () => {
    const { username, email, password } = userInfo;
    if (isValidForm()) {
      try {
        const res = await register(username, email, password);
        if (res["status"] == statusCode.OK) {
          console.log("Register successfully");
        }
      } catch (err) {
        console.log("Error Register");
      }
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bgColor, paddingTop: 20 }}
    >
      <StatusBar barStyle="dark-content" />
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
        <Text style={styles.txtIcon}>Đăng Ký</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Image source={require("../../image/LogoV.png")} />
        <Text style={styles.tittle}>Chào mừng bạn đến với VinLand</Text>
      </View>
      <KeyboardAwareScrollView>
        <FormInput
          error={error}
          value={username}
          onChangeText={(value) => handleOnChangeText(value, "username")}
          source={require("../../image/userlg.png")}
          placeholder="Vui lòng nhập tên của bạn"
        />
        <FormInput
          error={error}
          value={email}
          onChangeText={(value) => handleOnChangeText(value, "email")}
          source={require("../../image/mail-inbox-app.png")}
          placeholder="Vui lòng nhập email của bạn"
        />
        <FormInput
          error={error}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={(value) => handleOnChangeText(value, "password")}
          source={require("../../image/padlock.png")}
          placeholder="Vui lòng nhập mật khẩu của bạn"
        />

        <TouchableOpacity
          onPress={submitForm}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.btnLogin}>
            <Text style={styles.textLogin}>Đăng Ký</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
    alignItems: "center",
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
    marginTop: 10,
  },
  textLogin: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 18,
  },
});
