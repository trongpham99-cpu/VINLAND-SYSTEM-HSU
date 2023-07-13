import React, { useEffect } from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { format } from "../../utils/index";
import { to_vietnamese } from "../../utils/number_to_text";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { getAllHome } from "../../services/home";
import _, { set } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ props, navigation }) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const categoryList = ["Tất cả", "Căn hộ", "Nhà cho thuê", "Chung cư"];
  const [loading, setLoading] = useState(false);
  const [homeList, setHomeList] = useState([]);

  const getHomeList = async (params = {}) => {
    setLoading(true);
    try {
      const type = selectedCategoryIndex;
      const newParams = { ...params, type: type }
      const response = await getAllHome(newParams);
      setHomeList(response);
      setLoading(false);
    } catch (error) {
      return console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedCategoryIndex(0);
      getHomeList();
    });
    return unsubscribe;
  }, []);

  const onSearch = async (text) => {
    getHomeList({ keyword: text });
  };

  useEffect(() => {
    getHomeList();
  }, [selectedCategoryIndex]);

  const ListCategory = () => {
    return (
      <View style={styles.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryListText,
                index == selectedCategoryIndex && styles.activeCategoryList,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const CardPopular = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("DetailScreen", item)}>
        <View style={styles.cardPopular}>
          <Image source={item.thumbnail} style={styles.cardPoppularImage} />
          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Bold" }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <Icon name="location" size={16} color={COLORS.blue} />
              <Text
                style={{
                  color: COLORS.tittleColor,
                  fontSize: 16,
                }}
              >
                {item.location.address +
                  ", " +
                  item.location.district +
                  ", " +
                  item.location.province}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: COLORS.btnColor,
                }}
              >
                {format(item.price)}
              </Text>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: COLORS.blue,
                }}
              >
                ({to_vietnamese(item.price)})
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const CardNearest = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("DetailScreen", item)}>
        <View style={styles.cardNearest}>
          <Image source={item.thumbnail} style={styles.cardNearestImage} />
          <View
            style={{
              flexDirection: "column",
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Bold" }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <Icon name="location" size={14} color={COLORS.blue} />
              <Text
                style={{
                  width: width - 180,
                  color: COLORS.tittleColor,
                  fontSize: 14,
                }}
              >
                {item.location.address +
                  ", " +
                  item.location.district +
                  ", " +
                  item.location.province}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.btnColor,
                }}
              >
                {format(item.price)}
              </Text>
              <Text
                style={{
                  fontFamily: "Bold",
                  color: COLORS.blue,
                }}
              >
                ({to_vietnamese(item.price)})
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (

    <SafeAreaView style={{ backgroundColor: COLORS.bgColor, flex: 1 }}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontFamily: "Regular", color: COLORS.grey }}>
            Vị trí hiện tại
          </Text>
          <Text
            style={{
              fontFamily: "SemiBold",
              color: "black",
              fontSize: 18,
            }}
          >
            Thành Phố Hồ Chí Minh, Việt Nam
          </Text>
        </View>
        <Icon
          style={{
            borderColor: COLORS.greylight,
            borderWidth: 2,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
          name="notifications"
          size={22}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View style={styles.searchInput}>
          <Icon name="search" size={25} color={COLORS.grey} />
          <TextInput
            style={{ paddingHorizontal: 5 }}
            onChange={(e) => onSearch(e.nativeEvent.text)}
            placeholder="Tìm kiếm nhà, căn hộ, dự án cho thuê"
          />
        </View>
        {getToken() != null ? (
          <TouchableOpacity
            onPress={(item) => navigation.navigate("SellProperty", item)}
          >
            <Icon
              style={{
                borderColor: COLORS.greylight,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                color: "gray",
                marginLeft: 5,
              }}
              name="add"
              size={22}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <ListCategory />
      <ActivityIndicator size="small" color="#0000ff" animating={loading} />
      {
        !loading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginVertical: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  color: COLORS.tittleColor,
                  fontSize: 20,
                }}
              >
                Dự án nổi bật
              </Text>
              <TouchableOpacity
                onPress={({ item }) => navigation.navigate("HomePopular", item)}
              >
                <Text
                  style={{
                    fontFamily: "Regular",
                    color: COLORS.tittleColor,
                    fontSize: 16,
                  }}
                >
                  xem tất cả
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              napToInterval={width - 40}
              contentContainerStyle={{ paddingLeft: 5, paddingVertical: 20 }}
              horizontal
              data={homeList}
              keyExtractor={(item_home) => {
                return item_home._id;
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <CardPopular item={item} />}
              key={(item) => item._id}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginVertical: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  color: COLORS.tittleColor,
                  fontSize: 20,
                }}
              >
                Dự án gần bạn
              </Text>
              <TouchableOpacity
                onPress={({ item }) => navigation.navigate("HomeNearest", item)}
              >
                <Text
                  style={{
                    fontFamily: "Regular",
                    color: COLORS.tittleColor,
                    fontSize: 16,
                  }}
                >
                  xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              napToInterval={width - 40}
              contentContainerStyle={{ paddingLeft: 10, paddingVertical: 20 }}
              horizontal
              data={homeList}
              keyExtractor={(item_home) => {
                return item_home._id;
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <CardNearest item={item} />}
              key={(item) => item._id}
            />
          </ScrollView>
        )
      }
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInput: {
    height: 50,
    backgroundColor: COLORS.white,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: COLORS.greylight,
    borderWidth: 2,
    marginBottom: 18,
  },
  sortBtn: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  categoryListText: {
    fontSize: 16,
    fontFamily: "Regular",
    paddingVertical: 10,
    color: COLORS.grey,
  },
  activeCategoryList: {
    color: COLORS.btnColor,
    fontSize: 18,
    fontFamily: "Bold",
  },
  cardPopular: {
    height: 320,
    width: width - 100,
    backgroundColor: "#fafafa",
    elevation: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  cardPoppularImage: {
    width: "100%",
    height: 180,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardNearest: {
    height: 140,
    width: width - 15,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  cardNearestImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});
