import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../constants/colors";
import houses from "../../constants/houses";
import { getMyHomes } from "../../services/home";

export default function MyPost({ navigation }) {
  const [home, setHome] = React.useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      _getMyPost();
    });
    return unsubscribe;
  }, [navigation]);

  const _getMyPost = async () => {
    getMyHomes()
      .then((res) => {
        setHome(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CardItemHome = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("DetailScreen", item)}
        style={{
          flex: 1,
          backgroundColor: COLORS.bgColor,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: COLORS.tittleColor,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: COLORS.tittleColor,
              fontFamily: "Bold",
              fontSize: 20,
              marginBottom: 5,
            }}
          >
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon name="schedule" size={18} color={COLORS.grey} />
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {item.createdAt}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon name="today" size={18} color={COLORS.grey} />
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="person" size={18} color={COLORS.grey} />
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {item.owner.username}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.headerBtnClose}>
            <Icon
              name="delete"
              size={20}
              style={{ textAlign: "center" }}
              color={"#F44336"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtnDone}>
            <Icon
              name="edit"
              size={20}
              style={{ textAlign: "center" }}
              color={"#0D47A1"}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

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
        <Text style={styles.txtIcon}>Tin đã đăng</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.bgColor,
          marginTop: 20,
        }}
      >
        <FlatList
          data={home}
          renderItem={({ item }) => {
            return <CardItemHome home={item} />;
          }}
        ></FlatList>
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
  headerBtnClose: {
    height: 40,
    width: 40,
    backgroundColor: "#FFEBEE",
    borderRadius: 10,
    margin: 5,
    justifyContent: "center",
  },
  headerBtnDone: {
    height: 40,
    width: 40,
    margin: 5,
    backgroundColor: "#E1F5FE",
    borderRadius: 10,
    justifyContent: "center",
  },
  txtIcon: {
    marginLeft: 80,
    fontFamily: "Bold",
    fontSize: 24,
    textAlign: "center",
  },

  tittle: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    fontSize: 20,
    fontFamily: "Bold",
  },
});
