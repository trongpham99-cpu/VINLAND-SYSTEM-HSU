import React from "react";
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
  Button,
} from "react-native";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import houses from "../../constants/houses";

export default function Home() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const categoryList = ["Tất cả", "Căn hộ", "Nhà cho thuê", "Chung cư"];

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

  const Card = ({ house }) => {
    return (
      <Pressable
      // onPress={() => navigation.navigate("DetailScreen", house)}
      >
        <View>
          <Image source={house.image} style={styles.cardImage} />
          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Bold" }}>
              {house.title}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Regular", marginTop: 5 }}>
              {house.location}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Bold",
                color: COLORS.btnColor,
                marginTop: 5,
              }}
            >
              {house.price}
            </Text>
          </View>

          {/* <View style={{ marginTop: 15, flexDirection: "row" }}>
            <View style={{ flexDirection: "column", marginRight: 10 }}>
              <Text
                style={{ fontSize: 14, color: COLORS.dark, fontWeight: "bold" }}
              >
                Phòng ngủ
              </Text>
              <View style={styles.facility}>
                <Icon name="hotel" size={20} />
                <Text style={styles.facilityText}>2</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", marginRight: 10 }}>
              <Text
                style={{ fontSize: 14, color: COLORS.dark, fontWeight: "bold" }}
              >
                Phòng tắm
              </Text>
              <View style={styles.facility}>
                <Icon name="bathtub" size={20} />
                <Text style={styles.facilityText}>2</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", marginRight: 10 }}>
              <Text
                style={{ fontSize: 14, color: COLORS.dark, fontWeight: "bold" }}
              >
                Diện tích
              </Text>
              <View style={styles.facility}>
                <Icon name="aspect-ratio" size={20} />
                <Text style={styles.facilityText}>200 m2</Text>
              </View>
            </View>
          </View> */}
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
            placeholder="Tìm kiếm nhà, căn hộ, dự án cho thuê"
          />
        </View>
        {/* <Pressable style={styles.sortBtn}>
          <Icon name="add-circle" color={COLORS.btnColor} size={30} />
        </Pressable> */}
      </View>
      <ListCategory />
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
        <Pressable>
          <Text
            style={{
              fontFamily: "Regular",
              color: COLORS.tittleColor,
              fontSize: 16,
            }}
          >
            xem tất cả
          </Text>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          numColumns={2}
          data={houses}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 0.5,
                height: 350,
                marginLeft: index % 2 == 0 ? 10 : 0,
                marginRight: 10,
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: COLORS.greylight,
              }}
            >
              <Card house={item} />
            </View>
          )}
        />
      </ScrollView>
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
  // card: {
  //   // height: 400,
  //   // width: width - 100,
  //   // backgroundColor: COLORS.greylight,
  //   // marginRight: 10,
  //   // marginBottom: 10,
  //   // padding: 5,
  //   // borderRadius: 10,
  // },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
