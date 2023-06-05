import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import React from "react";
import COLORS from "../../constants/colors";

export default function QRcode({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.btnColor, paddingTop: 10 }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 20 }}
            name="arrow-back-ios"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 5,
              marginHorizontal: 20,
            }}
            source={require("../../image/user1.avif")}
          />
          <View>
            <Text style={styles.txtInfor}>Trần Đăng Khôi</Text>
            <Text style={styles.txtInfor}>khoidang@gmail.com</Text>
            <Text style={styles.txtInfor}>0912071706</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: COLORS.bgColor,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 350,
            height: 350,
            backgroundColor: COLORS.tittleColor,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 300, height: 300, backgroundColor: COLORS.bgColor }}
            source={require("../../image/qrcode1.png")}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.4,
          backgroundColor: COLORS.bgColor,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Image
            style={{ width: 40, height: 40, marginBottom: 10 }}
            source={require("../../image/download.png")}
          />
          <Text style={{ fontFamily: "Regular", fontSize: 20 }}>
            Tải xuống mã QR
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Image
            style={{ width: 40, height: 40, marginBottom: 10 }}
            source={require("../../image/share.png")}
          />
          <Text style={{ fontFamily: "Regular", fontSize: 20 }}>
            Chia sẽ mã QR
          </Text>
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
    textAlign: "center",
  },
});
