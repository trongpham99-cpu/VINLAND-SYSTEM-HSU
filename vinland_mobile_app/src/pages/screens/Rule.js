import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import COLORS from "../../constants/colors";

export default function Rule({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bgColor, paddingTop: 20 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-ios"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <Text style={styles.txtIcon}>Quy định và hỗ trợ</Text>
      </View>
      <View
        style={{
          height: 200,
          backgroundColor: COLORS.btnColor,
          marginTop: 40,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 26,
              color: COLORS.bgColor,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Nếu bạn gặp khó khăn hãy gọi cho chúng tôi
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 40,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../image/phone-call.png")}
            />
            <Text
              style={{ marginLeft: 10, fontSize: 24, color: COLORS.bgColor }}
            >
              1900 9001
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 40,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../image/chat.png")}
            />
            <Text
              style={{ marginLeft: 10, fontSize: 24, color: COLORS.bgColor }}
            >
              Chat với chúng tôi
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginTop: 20,
          fontFamily: "Bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Các quy định chung
      </Text>
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
    textAlign: "center",
    marginLeft: 26,
    fontFamily: "Bold",
    fontSize: 24,
  },
});
