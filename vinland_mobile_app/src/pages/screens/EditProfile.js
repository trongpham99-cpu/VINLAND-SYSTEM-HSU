import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function EditProfile({ navigation }) {
  const [image, setImage] = useState({ item });
  const [name, setName] = useState("My Name");
  const [email, setEmail] = useState("myname@gmail.com");
  const [password, setPassword] = useState(".........");
  const item = () => {
    <Image source={require("../../image/user.jpg")} />;
  };
  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
          <TouchableOpacity onPress={handleImageSelect}>
            {/* <Image
              source={require("../../image/user.jpg")}
              // source={{
              //   uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              // }}
              style={{
                height: 160,
                width: 160,
                borderRadius: 80,
                borderWidth: 2,
                borderColor: COLORS.grey,
              }}
            /> */}
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
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 12,
                zIndex: 9999,
              }}
            >
              <Icon name="photo-camera" size={32} color={COLORS.btnColor} />
            </View>
          </TouchableOpacity>
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
              Ho va ten
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
              Mat Khau
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
