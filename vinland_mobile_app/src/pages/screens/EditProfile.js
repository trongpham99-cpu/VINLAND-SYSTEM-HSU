import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function EditProfile({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.canceled) {
        setImage(capturedImage.assets[0].uri);
      }
    }
  };
  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const capturedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.canceled) {
        setImage(capturedImage.assets[0].uri);
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
        <Text style={styles.txtIcon}>Sửa thông tin tài khoản</Text>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", marginVertical: 22 }}>
          {image && (
            <Image
              //source={require("../../image/user.jpg")}
              source={{ uri: image }}
              style={{
                height: 160,
                width: 160,
                borderRadius: 80,
                borderWidth: 2,
                borderColor: COLORS.grey,
              }}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <Button title="Camera" onPress={() => handleImagePicker()} />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ justifyContent: "center" }}>
              <Button title="Gallery" onPress={() => handleImageSelect()} />
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 20, marginBottom: 5 }}>
              Họ và tên
            </Text>
            <View
              style={{
                height: 44,
                width: "90%",
                borderColor: COLORS.grey,
                borderWidth: 0.5,
                borderRadius: 4,
                marginHorizontal: 10,
                marginVertical: 5,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={name}
                placeholder="Nhập tên của bạn"
                onChangeText={(value) => setName(value)}
                editable={true}
              ></TextInput>
            </View>
          </View>
          <View
            style={{ flexDirection: "column", marginBottom: 6, marginLeft: 10 }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 20, marginBottom: 5 }}>
              Email
            </Text>
            <View
              style={{
                height: 44,
                width: "90%",
                borderColor: COLORS.grey,
                borderWidth: 0.5,
                borderRadius: 4,
                marginHorizontal: 10,
                marginVertical: 5,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Nhập Email của bạn"
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={true}
              ></TextInput>
            </View>
          </View>
          <View
            style={{ flexDirection: "column", marginBottom: 6, marginLeft: 10 }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 20, marginBottom: 5 }}>
              Mật khẩu
            </Text>
            <View
              style={{
                height: 44,
                width: "90%",
                borderColor: COLORS.grey,
                borderWidth: 0.5,
                borderRadius: 4,
                marginHorizontal: 10,
                marginVertical: 5,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Nhập mật khẩu vào đây"
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={true}
              ></TextInput>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "60%",
              backgroundColor: COLORS.grey,
              height: 44,
              marginTop: 10,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                color: COLORS.bgColor,
              }}
            >
              Lưu thông tin
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  txtIcon: {
    marginLeft: 20,
    fontFamily: "Bold",
    fontSize: 24,
  },
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
});
