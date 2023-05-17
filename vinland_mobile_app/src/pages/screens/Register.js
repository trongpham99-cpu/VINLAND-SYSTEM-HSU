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
import client from "../../api/client";
import FormInput from "../../services/FormInput";

export default function Register({ navigation }) {
  const [error, setError] = useState("");
  const userInfo = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { username, email, password, confirmPassword } = userInfo;
  const handleChange = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  // console.log(userInfo);

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Vui lòng nhập đầy đủ thông tin!", setError);
    if (!username.trim() || username.length < 3)
      return updateError("Tên không hợp lệ", setError);
    if (!isValidEmail(email))
      return updateError("Email không hợp lệ", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password không nhỏ hơn 8 kí tự!", setError);
    if (password !== confirmPassword)
      return updateError("Password không trùng khớp", setError);
    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      console.log(userInfo);
    }
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

  const signUp = async (values, formikActions) => {
    const res = await client.post("/auth/register", { ...values });
    console.log(res.data);
    // console.log(values);
    formikActions.resetForm();
    formikActions.setSubmitting(false);
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
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
        }) => {
          console.log(values);
          const { username, email, password, confirmPassword } = values;
          return (
            <>
              <FormInput
                error={touched.username && errors.username}
                value={username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                source={require("../../image/mail-inbox-app.png")}
                placeholder="Vui long nhap ten cua ban"
              />
              <FormInput
                error={touched.email && errors.email}
                value={email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                source={require("../../image/mail-inbox-app.png")}
                placeholder="Vui long nhap email cua ban"
              />
              <FormInput
                error={touched.password && errors.password}
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                source={require("../../image/padlock.png")}
                placeholder="Vui long nhap mat khau cua ban"
              />
              <FormInput
                error={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                source={require("../../image/padlock.png")}
                placeholder="Vui long nhap lai mat khau cua ban"
              />
              <TouchableOpacity
                submitting={isSubmitting}
                onPress={handleSubmit}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 15,
                }}
              >
                <View style={styles.btnLogin}>
                  <Text style={styles.textLogin}>Đăng Ký</Text>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
      {/* <ScrollView>
        {error ? (
          <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        <View style={styles.inputAuth}>
          <Image
            style={{ width: 20, height: 20, marginHorizontal: 20 }}
            source={require("../../image/mail-inbox-app.png")}
          />
          <TextInput
            value={username}
            onChangeText={(value) => handleOnChangeText(value, "username")}
            style={styles.txtInput}
            placeholder="Vui lòng nhập tên của bạn"
          />
        </View>
        <View style={styles.inputAuth}>
          <Image
            style={{ width: 20, height: 20, marginHorizontal: 20 }}
            source={require("../../image/mail-inbox-app.png")}
          />
          <TextInput
            value={email}
            onChangeText={(value) => handleOnChangeText(value, "email")}
            style={styles.txtInput}
            placeholder="Vui lòng nhập Email"
          />
        </View>
        <View style={styles.inputAuth}>
          <Image
            style={{ width: 20, height: 20, marginHorizontal: 20 }}
            source={require("../../image/padlock.png")}
          />
          <TextInput
            value={password}
            onChangeText={(value) => handleOnChangeText(value, "password")}
            secureTextEntry
            style={styles.txtInput}
            placeholder="Vui lòng nhập Mật Khẩu"
          />
        </View>
        <View style={styles.inputAuth}>
          <Image
            style={{ width: 20, height: 20, marginHorizontal: 20 }}
            source={require("../../image/padlock.png")}
          />
          <TextInput
            value={confirmPassword}
            onChangeText={(value) =>
              handleOnChangeText(value, "confirmPassword")
            }
            secureTextEntry
            style={styles.txtInput}
            placeholder="Vui lòng nhập lại Mật Khẩu"
          />
        </View>
        <Pressable
          onPress={submitForm}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <View style={styles.btnLogin}>
            <Text style={styles.textLogin}>Đăng Ký</Text>
          </View>
        </Pressable>
      </ScrollView> */}
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
    marginBottom: 10,
  },
  textLogin: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 18,
  },
});
