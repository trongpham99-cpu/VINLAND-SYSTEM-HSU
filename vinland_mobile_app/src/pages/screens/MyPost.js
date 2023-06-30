import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

export default function MyPost({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
    });
    return unsubscribe;
  }, [navigation]);

  _getMyPost = async () => {
    //call api
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
      <Text style={styles.txtIcon}>Tin đã đăng</Text>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txtIcon: {
    marginLeft: 20,
    fontFamily: "Bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
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
