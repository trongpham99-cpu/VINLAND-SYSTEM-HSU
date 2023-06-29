import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import COLORS from "../../constants/colors";
import { getProfile } from "../../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
      _getProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const [profile, setProfile] = React.useState({});

  const _getProfile = async () => {
    getProfile().then((res) => {
      if (res) {
        // console.log("Profile: ", res["data"])
        // setProfile(res["data"]);
      }
    });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token", (err) => {
      console.log("err: ", err);
    });
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.bgColor,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={styles.txtIcon}>Thông Tin Người Dùng</Text>
      </View>
      <View style={{ width: "100%" }}>
        <ImageBackground
          source={require("../../image/interior3.jpg")}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../image/user.jpg")}
          resizeMode="center"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.grey,
            borderWidth: 1,
            marginTop: -80,
          }}
        />
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: 24,
            marginVertical: 10,
          }}
        >
          {profile.username}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../image/mail-inbox-app.png")}
          />
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 20,
              marginTop: 4,
              marginLeft: 5,
              textAlign: "center",
            }}
          >
            khoidang@gmail.com
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={{
              width: 124,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.grey,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Regular",
                color: COLORS.bgColor,
              }}
            >
              Sửa thông tin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyPost")}
            style={{
              width: 124,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.grey,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Regular",
                color: COLORS.bgColor,
              }}
            >
              Tin đã đăng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 124,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.grey,
              borderRadius: 10,
            }}
            onPress={() => signOut()}
          >
            <Text
              style={{
                fontFamily: "Regular",
                color: COLORS.bgColor,
              }}
            >
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  txtIcon: {
    // marginLeft: 26,
    fontFamily: "Bold",
    fontSize: 24,
  },
  txtInfor: {
    fontSize: 20,
    fontFamily: "Regular",
    color: "#fff",
    paddingBottom: 5,
  },
  container: {
    gap: 10,
    backgroundColor: COLORS.bgColor,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
