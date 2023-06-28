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
import { formatISODate } from '../../utils';

export default function News({ props, navigation }) {
  const [house, setHouse] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
      fetchBlogs().then((res) => {
        setHouse(res);
      });
    });

    return unsubscribe;
  }, [navigation]);


  const renderCard = ({ item }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate("NewsDetail", { id: item._id })}
      >
        <View style={styles.card}>
          <ImageBackground style={styles.cardImage} source={{ uri: item.thumbnail }}>
            <View style={styles.overlay}>
              <Text style={styles.overlayDateTime}>
                {
                  formatISODate(item.createdAt, 'dd/MM/yyyy')
                }
              </Text>
              <Text style={styles.overlayText}>Tin tức</Text>
              <Text style={styles.overlayText}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </Pressable>
    )
  }

  const goToAdminScreen = () => {
    navigation.navigate("Admin");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 26,
              flex: 1,
              textAlign: "center",
            }}
          >
            Tin tức bất động sản
          </Text>
          <TouchableOpacity
            onPress={goToAdminScreen}
            style={styles.adminButton}
          >
            <Icon name="ellipsis-horizontal" size={22} />
          </TouchableOpacity>
        </View> */}
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
            data={house}
            renderItem={(item)=> {
              return renderCard(item);
            }}
            keyExtractor={(item) => {
              return item._id;
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />

          {/* <View style={styles.bottomImageContainer}>
            <Image
              source={require("../../image/interior2.jpg")}
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
                06/04/2023 10:30
              </Text>
              <Text style={styles.bottomImageText}>
                Tại sao căn hộ 2 PN lại chiếm ưu thế lớn
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  paddingHorizontal: 10,
                  marginLeft: 22,
                  marginRight: 22,
                }}
              >
                Khách hàng có điều kiện tài chính thường sẽ hướng đến căn hộ 2
                phòng ngủ ngay từ đầu bởi đây là lựa chọn tối ưu cho nhiều gia
                đình.
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "relative",
              marginVertical: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../image/interior2.jpg")}
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
                06/04/2023 10:30
              </Text>
              <Text style={styles.bottomImageText}>
                Tại sao căn hộ 2 PN lại chiếm ưu thế lớn
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  paddingHorizontal: 10,
                  marginLeft: 22,
                  marginRight: 22,
                }}
              >
                Khách hàng có điều kiện tài chính thường sẽ hướng đến căn hộ 2
                phòng ngủ ngay từ đầu bởi đây là lựa chọn tối ưu cho nhiều gia
                đình.
              </Text>
            </View>
          </View> */}
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
