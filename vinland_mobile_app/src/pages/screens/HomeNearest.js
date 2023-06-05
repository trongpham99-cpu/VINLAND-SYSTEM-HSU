import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAllHome } from "../../services/home";

export default function HomeNearest({ navigation }) {
  const [homeList, setHomeList] = useState([]);

  const getHomeList = async () => {
    try {
      const response = await getAllHome();
      setHomeList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeList();
  }, []);

  const CardPopular = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("DetailScreen", item)}>
        <View style={styles.cardPopular}>
          <Image source={item.thumbnail} style={styles.cardPoppularImage} />
          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Bold" }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <Icon name="place" size={12} color={COLORS.blue} />
              <Text
                style={{
                  color: COLORS.tittleColor,
                  fontSize: 12,
                }}
              >
                {item.location.address +
                  ", " +
                  item.location.district +
                  ", " +
                  item.location.province}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Bold",
                color: COLORS.btnColor,
                marginTop: 5,
              }}
            >
              {item.price}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bgColor, paddingTop: 10 }}
    >
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
        <Text style={styles.txtIcon}>Dự án gần bạn</Text>
      </View>

      <FlatList
        napToInterval={width - 10}
        contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 15 }}
        //   horizontal
        numColumns={2}
        data={homeList}
        keyExtractor={(item_home) => {
          return item_home.Id;
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CardPopular item={item} />}
      />
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("screen");
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
    marginLeft: 70,
    fontFamily: "Bold",
    fontSize: 24,
    alignItems: "center",
  },
  cardPopular: {
    height: 260,
    width: width - 220,
    backgroundColor: "#fafafa",
    elevation: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  cardPoppularImage: {
    width: "100%",
    height: 140,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
