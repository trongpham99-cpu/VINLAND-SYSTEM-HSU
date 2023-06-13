import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import houses from "../../constants/houses";

const DetailScreen = ({ navigation, route }) => {
  const item = route.params;
  // console.log(JSON.stringify(item));
  const InteriorCard = () => {
    return <Image source={interior} style={styles.interiorImage} />;
  };

  const onContact = () => {
    navigation.navigate("ChatDetail", "abc");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-ios"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Thông tin bất động sản
        </Text>
        <View style={styles.headerBtn}>
          <Image
            style={{ width: 30, height: 40, marginHorizontal: 30 }}
            // source={require("../../image/211780_more_icon.png")}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.backgroundImage} source={item.thumbnail}>
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: COLORS.primary,
              position: "absolute",
              borderTopLeftRadius: 15,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </ImageBackground>
        <TouchableOpacity style={styles.iconfavorite}>
          <Icon name="favorite" size={20} color={COLORS.red} disabled={false} />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Bold",
                color: COLORS.tittleColor,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: 340,
                // height: 40,
                flexDirection: "row",
              }}
            >
              <Icon name="place" size={18} color={COLORS.blue} />
              <Text
                style={{
                  color: COLORS.tittleColor,
                  fontSize: 18,
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
                flexDirection: "row",
              }}
            >
              <Icon name="star" size={20} color={COLORS.yellow} />
              <Text
                style={{
                  fontWeight: "bold",
                  // fontSize: 16,
                  marginLeft: 5,
                  textAlign: "center",
                }}
              >
                5.0
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 26,
                fontFamily: "Bold",
                color: COLORS.btnColor,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              {item.price}
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: 5,
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Mô Tả
            </Text>
            <Text
              style={{ lineHeight: 20, fontFamily: "Regular", fontSize: 18 }}
            >
              {item.description}{" "}
            </Text>
          </View>
          <View>
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>
              Hình ảnh liên quan
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: 15 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, key) => key.toString()}
              data={item.interior}
              renderItem={({ item }) => <InteriorCard interior={item} />}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={styles.facility}></View>
          </View>
          <View>
            <Text
              style={{ fontFamily: "Bold", fontSize: 20, marginBottom: 10 }}
            >
              Thông tin liên hệ
            </Text>
            <View style={styles.btn1}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 30 }}
                source={require("../../image/user.jpg")}
              />
              <Text style={styles.text1}>Nguyễn Minh Trung</Text>
              <TouchableOpacity
                onPress={() => {
                  onContact();
                }}
              >
                <Image
                  style={{ width: 40, height: 40, marginLeft: 80 }}
                  source={require("../../image/chat.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Pressable
          onPress={() => {
            onContact();
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.btn1}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 20 }}
              source={require("../../image/user.jpg")}
            />
            <Text style={styles.text1}>Liên Hệ</Text>
          </View>
        </Pressable> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },

  backgroundImage: {
    marginHorizontal: 10,
    height: 240,
    borderRadius: 15,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
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
    marginLeft: 5,
  },
  iconfavorite: {
    height: 40,
    width: 40,
    position: "absolute",
    top: 20,
    borderColor: "#DADADA",
    backgroundColor: "white",
    borderRadius: 20,
    right: 30,
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    color: "red",
  },
  interiorImage: {
    width: width / 2 - 20,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  btn1: {
    height: 60,
    backgroundColor: COLORS.bgColor,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: -4, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
  },
  text1: {
    marginLeft: 10,
    color: "black",
    fontFamily: "Bold",
    fontSize: 18,
  },
});

export default DetailScreen;