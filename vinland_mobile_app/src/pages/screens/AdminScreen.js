import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import COLORS from "../../constants/colors";

const AdminScreen = (route) => {
  const navigation = useNavigation();
  const item = route.params;

  const [newsList, setNewsList] = useState([
    {
      id: 1,
      title: "Cập nhật giá chung cư VinHome Central Park mới nhất",
      description:
        "Mô tả chi tiết của bản tin về giá chung cư VinHome Central Park.",
      image: require("../../image/vinhome2.jpg"),
      published: false,
    },
  ]);

  const approveNews = (id) => {
    setNewsList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, published: true } : item
      )
    );
  };

  const deleteNews = (id) => {
    setNewsList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const renderNewsItem = ({ item }) => {
    const getStatusStyle = () => {
      if (item.published) {
        return [styles.newsItemStatus, styles.Status];
      } else {
        return [styles.newsItemStatus, styles.unStatus];
      }
    };

    const approveButtonTextStyle = item.published ? { color: "green" } : {};
    const deleteButtonTextStyle = item.published ? { color: "red" } : {};

    return (
      <View style={styles.newsItemContainer}>
        <Text style={styles.newsItemTitle}>{item.title}</Text>
        <Text style={styles.newsItemDescription}>{item.description}</Text>
        <Image
          source={item.image}
          style={{
            width: 300,
            height: 200,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text style={getStatusStyle()}>
          {item.published ? "Đã được phê duyệt" : "Chưa được phê duyệt"}
        </Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => approveNews(item.id)}
            style={[
              styles.actionButton,
              { borderColor: item.published ? "green" : COLORS.gray },
            ]}
          >
            <Icon name="check-circle" size={20} color="green" />
            <Text style={[styles.actionText, approveButtonTextStyle]}>
              Phê duyệt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteNews(item.id)}
            style={[
              styles.actionButton,
              { borderColor: item.published ? "red" : COLORS.gray },
            ]}
          >
            <Icon name="delete" size={20} color="red" />
            <Text style={[styles.actionText, deleteButtonTextStyle]}>
              Xóa tin
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewsDetail", item)}
          style={styles.viewDetail}
        >
          <Text style={styles.viewDetailText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={navigation.goBack}
          >
            <Icon name="arrow-back-ios" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Trang Admin</Text>
        </View>

        <FlatList
          data={newsList}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.newsList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
    marginLeft: 5,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  newsList: {
    flex: 1,
  },
  newsItemContainer: {
    marginBottom: 20,
  },
  newsItemTitle: {
    fontFamily: "Bold",
    fontSize: 20,
    marginHorizontal: 10,
    textAlign: "justify",
  },
  newsItemDescription: {
    marginTop: 5,
    marginHorizontal: 10,
    fontFamily: "Regular",
    fontSize: 18,
    marginBottom: 10,
  },
  newsItemStatus: {
    marginTop: 5,
    alignSelf: "center",
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  Status: {
    color: "green",
    borderColor: "green",
  },
  unStatus: {
    color: "red",
    borderColor: "red",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    marginRight: 10,
  },
  actionText: {
    marginLeft: 5,
    color: COLORS.black,
  },
  viewDetail: {
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  viewDetailText: {
    color: COLORS.blue,
  },
});

export default AdminScreen;
