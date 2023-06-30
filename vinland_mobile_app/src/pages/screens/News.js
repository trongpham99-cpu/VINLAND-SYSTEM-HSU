import React, { useEffect } from "react";
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
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { fetchBlogs } from "../../services/blog";
import { formatISODate } from "../../utils";
import RenderHTML from "react-native-render-html";

export default function News({ props, navigation }) {
  const [topBlogs, setTopBlogs] = React.useState([]);
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      _fetchTopBlogs();
      _fetchBlogs();
    });

    return unsubscribe;
  }, [navigation]);

  const _fetchTopBlogs = () => {
    fetchBlogs(5).then((res) => {
      setTopBlogs(res);
    });
  };

  const _fetchBlogs = () => {
    fetchBlogs().then((res) => {
      setBlogs(res);
    });
  };

  const renderCard = ({ item }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate("NewsDetail", { id: item._id })}
      >
        <View style={styles.card}>
          <ImageBackground
            style={styles.cardImage}
            source={{ uri: item.thumbnail }}
          >
            <View style={styles.overlay}>
              <Text style={styles.overlayDateTime}>
                {formatISODate(item.createdAt, "dd/MM/yyyy")}
              </Text>
              <Text style={styles.overlayText}>Tin tức</Text>
              <Text style={styles.overlayText}>{item.title}</Text>
            </View>
          </ImageBackground>
        </View>
      </Pressable>
    );
  };

  const goToAdminScreen = () => {
    navigation.navigate("Admin");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 26,
            }}
          >
            Tin tức bất động sản
          </Text>
        </View>
        <ScrollView>
          <View style={styles.searchInput}>
            <Icon name="search" size={25} color={COLORS.grey} />
            <TextInput
              style={{ paddingHorizontal: 5 }}
              placeholder="Tìm kiếm "
            />
          </View>
          <Text style={styles.descriptionText}>
            Những thông tin mới nhất,hấp dẫn nhất về thị trường bất động sản
            Việt Nam
          </Text>
          <FlatList
            data={topBlogs}
            renderItem={(item) => {
              return renderCard(item);
            }}
            keyExtractor={(item) => {
              return item._id;
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
          {blogs.map((item) => {
            return (
              <Pressable
                style={styles.bottomImageContainer}
                onPress={() =>
                  navigation.navigate("NewsDetail", { id: item._id })
                }
              >
                <View style={styles.bottomImageContainer}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.bottomImage}
                  />
                  <View style={styles.overlayTextContainer}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Tin tức
                    </Text>
                  </View>
                  <View style={styles.bottomImageTextContainer}>
                    <Text style={{ fontSize: 16, color: COLORS.tittleColor }}>
                      {item.updatedAt}
                    </Text>
                    <Text style={styles.bottomImageText}>{item.title}</Text>
                    {/* <RenderHTML
                      contentWidth={width - 100}
                      source={{
                        html: item.content,
                      }}
                    /> */}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  adminButton: {
    borderColor: COLORS.greylight,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginTop: 5,
  },
  searchInput: {
    height: 50,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 45,
    borderColor: COLORS.greylight,
    borderWidth: 2,
    marginBottom: 18,
    marginHorizontal: 20,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: "SemiBold",
    textAlign: "center",
    marginBottom: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  card: {
    marginRight: 10,
  },
  cardImage: {
    width: 250,
    height: 200,
    overflow: "hidden",
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 3,
  },
  overlayDateTime: {
    color: COLORS.white,
    fontSize: 14,
  },
  overlayText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bottomImageContainer: {
    position: "relative",
    marginVertical: 20,
    alignItems: "center",
  },
  bottomImage: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomImageTextContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Set background color to white with opacity
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: "100%",
    height: "50%",
    alignItems: "center",
  },
  bottomImageText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  overlayTextContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    bottom: 150,
    left: 15,
    borderRadius: 10,
  },
});
