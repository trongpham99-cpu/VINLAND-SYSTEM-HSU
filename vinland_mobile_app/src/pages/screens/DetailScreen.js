import React, { useEffect, useState } from "react";
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
import { createRoom } from "../../services/room";
import { getDetailHome } from "../../services/home";

const DetailScreen = ({ navigation, route }) => {
  const item = route.params;
  const { _id } = item;
  const [home, setHome] = useState(null);

  useEffect(() => {
    getDetail();
  }, [_id]);

  const getDetail = () => {
    getDetailHome(_id)
      .then((res) => {
        setHome(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onContact = async () => {
    const room = {
      name: home.title,
      avatar: home.thumbnail[0],
      postId: home._id,
    };

    createRoom(room)
      .then((res) => {
        console.log(res);
        // if (res && res._id) {

        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View key={"dev"} style={styles.header}>
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-ios"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: 20,
            textAlign: "center",
            marginLeft: 50,
          }}
        >
          Thông tin bất động sản
        </Text>
        {/* <View style={styles.headerBtn}>
          <Image style={{ width: 30, height: 40, marginHorizontal: 30 }} />
        </View> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.backgroundImage}
          source={home?.thumbnail}
        >
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
              {home?.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: 340,
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
                {home?.location.address +
                  ", " +
                  home?.location.district +
                  ", " +
                  home?.location.province}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon name="star" size={20} color={COLORS.yellow} />
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: 5,
                  textAlign: "center",
                }}
              >
                {home?.rating}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                color: COLORS.btnColor,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              {home?.price}
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
              {home?.description}
            </Text>
          </View>
          <View>
            <FlatList
              contentContainerStyle={{ marginTop: 15 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, key) => key.toString()}
              data={home?.attachments}
              renderItem={({ item: url }) => {
                return (
                  <Image source={{ uri: url }} style={styles.interiorImage} />
                );
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={styles.facility}></View>
          </View>
          <Pressable onPress={() => onContact()}>
            <View>
              <View style={styles.btn1}>
                <Text style={styles.text1}>{home?.owner?.username}</Text>
                <Image
                  style={{ width: 20, height: 20, marginHorizontal: 10 }}
                  source={require("../../image/chat.png")}
                />
              </View>
            </View>
          </Pressable>
        </View>
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
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
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
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
    display: "flex",
  },
  text1: {
    marginLeft: 10,
    color: "black",
    fontFamily: "Bold",
    fontSize: 18,
  },
});

export default DetailScreen;
