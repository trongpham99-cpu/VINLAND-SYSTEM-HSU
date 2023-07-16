import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import COLORS from "../../constants/colors";
import { adminGetAllHome } from "../../services/home";
import { format } from "../../utils/index";

export default function MyProduct({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      _getList();
    });

    return unsubscribe;
  }, [navigation]);

  const [response, setResponse] = React.useState({
    rows: [],
    options: {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    },
  });

  const _getList = async () => {
    adminGetAllHome()
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CardProduct = ({ item }) => {
    return (
      // <Text>{item.title}</Text>
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
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Bold",
                color: COLORS.tittleColor,
              }}
            >
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
                {/* {item.location} */}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.btnColor,
                marginTop: 5,
              }}
            >
              {format(item.price)}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bgColor, paddingTop: 20 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-ios"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <Text style={styles.txtIcon}>Quản lý sản phẩm</Text>
      </View>
      <View style={styles.chartBox}>
        <View style={styles.chart}>
          <TouchableOpacity style={styles.newsPost}>
            <Icon name="add-circle" size={25} color={COLORS.bgColor} />
            <Text style={styles.txtDetail}>Tổng tất cả tin</Text>
            <Text style={styles.txtNumber}>{response.options.total || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newsCancel}>
            <Icon name="cancel" size={25} color={COLORS.bgColor} />
            <Text style={styles.txtDetail}>Tổng tin bị từ chối</Text>
            <Text style={styles.txtNumber}>
              {response.options.rejected || 0}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chart}>
          <TouchableOpacity style={styles.newsShow}>
            <Icon name="visibility" size={25} color={COLORS.bgColor} />
            <Text style={styles.txtDetail}>Tổng tin đang hiển thị</Text>
            <Text style={styles.txtNumber}>
              {response.options.approved || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newsPending}>
            <Icon name="visibility" size={25} color={COLORS.bgColor} />
            <Text style={styles.txtDetail}>Tổng tin đang chờ duyệt</Text>
            <Text style={styles.txtNumber}>
              {response.options.pending || 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <FlatList
          napToInterval={width - 20}
          contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 15 }}
          numColumns={2}
          data={response.rows}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CardProduct item={item} />}
        />
      </View>
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
    textAlign: "center",
    marginLeft: 30,
    fontFamily: "Bold",
    fontSize: 24,
  },
  cardPopular: {
    height: 260,
    width: width - 220,
    backgroundColor: "#fafafa",
    elevation: 10,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  cardPoppularImage: {
    width: "100%",
    height: 140,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  chartBox: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
  },
  chart: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  newsPost: {
    width: 200,
    height: 100,
    marginRight: 6,
    backgroundColor: "#1565C0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  newsCancel: {
    width: 200,
    height: 100,
    marginRight: 6,
    backgroundColor: "#C62828",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  newsShow: {
    width: 200,
    height: 100,
    marginRight: 6,
    backgroundColor: "#00E676",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  newsPending: {
    width: 200,
    height: 100,
    marginRight: 6,
    backgroundColor: "#2962FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  txtDetail: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: COLORS.bgColor,
  },
  txtNumber: {
    fontWeight: "bold",
    fontSize: 25,
    color: COLORS.bgColor,
  },
});
