import React, { useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import houses from "../../constants/houses";
import { fetchBlogDetail } from "../../services/blog";
import { formatISODate } from "../../utils";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
const NewsDetailScreen = ({ navigation, route }) => {
  const item = route.params;
  const { id } = item;
  const { width } = useWindowDimensions();
  const [blog, setBlog] = React.useState({});

  useEffect(() => {
    fetchBlogDetail(id).then((res) => {
      setBlog(res);
    });
  }, [id])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerBtn}>
            <Icon
              style={{ marginLeft: 10 }}
              name="arrow-back-ios"
              size={24}
              onPress={navigation.goBack}
            />
          </View>
          <Text style={styles.headerText}>Chi tiết bản tin</Text>
        </View>
        <View style={styles.content}>
          <Image style={styles.thumbnail} source={{ uri: blog.thumbnail }} />
          <Text style={styles.title}>
            {blog.title}
          </Text>
          <View style={styles.infoContainer}>
            <Image
              source={require("../../image/user.jpg")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 999,
                borderColor: COLORS.grey,
                borderWidth: 1,
                marginTop: 10,
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.infoText}>Được đăng bởi: <Text style={{ fontWeight: "bold" }}>{
              }</Text></Text>
              <Text style={styles.infoText}>{
                formatISODate(blog.createdAt, 'dd/MM/yyyy')
              }</Text>
              <Text style={{ ...styles.infoText, marginBottom: 10 }}>Tin tức</Text>
            </View>
          </View>
          <View style={{
            marginLeft: 5,
          }} >
            <RenderHtml
              contentWidth={width}
              source={{
                html: blog.content
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
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
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center"
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,

  },
  thumbnail: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 5,
  },


})
export default NewsDetailScreen;