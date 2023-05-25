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
} from "react-native";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import houses from "../../constants/houses";

const DetailScreen = ({ navigation, route }) => {
  const house = route.params;
  const InteriorCard = ({ interior }) => {
    return <Image source={interior} style={styles.interiorImage} />;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* House image */}

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
            //source={require("../../image/211780_more_icon.png")}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}
        <ImageBackground style={styles.backgroundImage} source={house.image}>
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
        <View style={styles.iconfavorite}>
          <Icon name="favorite" size={20} color={COLORS.red} />
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Bold",
                color: COLORS.btnColor,
              }}
            >
              {house.title}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Bold",
                color: COLORS.btnColor,
                // marginLeft: 200,

                alignItems: "center",
              }}
            >
              {house.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <View
              style={{
                width: 300,
                height: 50,
                flexDirection: "row",
              }}
            >
              <Icon name="place" size={18} color={COLORS.blue} />
              <Text
                style={{
                  color: COLORS.tittleColor,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {house.location}
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
                marginTop: 5,
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Description
            </Text>
            <Text style={{ lineHeight: 20 }}>{house.details} </Text>
          </View>
          <View>
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>
              Preview
            </Text>
            {/* Interior list */}
            <FlatList
              contentContainerStyle={{ marginTop: 15 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, key) => key.toString()}
              data={house.interiors}
              renderItem={({ item }) => <InteriorCard interior={item} />}
            />
          </View>

          {/* Facilities container */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={styles.facility}></View>
          </View>
        </View>
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.btn1}>
            <Text style={styles.text1}>Liên Hệ</Text>
          </View>
        </Pressable>
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
    paddingVertical: 20,
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
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  btn1: {
    height: 60,
    width: 310,
    backgroundColor: "#2D77EF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 10,
  },
  text1: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 18,
  },
});

export default DetailScreen;
