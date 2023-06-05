import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View ,Image, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import houses from "../../constants/houses";

const NewsDetailScreen = ({ navigation, route }) => {
  const item = route.params;

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
        <Text style={styles.title}>Cập nhật giá chung cư VinHome Central Park mới nhất</Text>
        <View style={styles.infoContainer}>
        <Image
          source={require("../../image/user.jpg")}
          style={{
            height: 50,
            width: 50,
            borderRadius: 999,
            borderColor: COLORS.grey,
            borderWidth: 1,
            marginTop:10,
          }}
        />
 <View style={{ marginLeft: 10 }}>
    <Text style={styles.infoText}>Được đăng bởi: <Text style={{ fontWeight: "bold" }}>Nguyễn Minh Trung</Text></Text>
    <Text style={styles.infoText}>07/04/2023 8:38</Text>
    <Text style={{ ...styles.infoText, marginBottom: 10 }}>Tin tức</Text>
  </View>
        </View>
  <View style={{
    marginLeft:5,
  }} >
        <Text style={{
        fontSize: 16,
        marginTop: -10,
        lineHeight: 26,
        fontFamily: "Regular",
        color: COLORS.black,
        } }>Đi đôi với sự phát triển của xã hội là nhu cầu về chất lượng cuộc sống - bao gồm nhà ở ngày một gia tăng. Theo đó, khi tìm mua nhà chung cư, điều khách hàng hiện đại kỳ vọng không đơn thuần là nơi để sinh sống, mà còn phải đáp ứng các yếu tố về vị trí, tiện nghi và dịch vụ bao hàm</Text>
  <Image source={require("../../image/vinhome2.jpg")} style={{ width: 300, height: 200 }} />
  <Text style={{
     fontSize: 16,
     marginTop: 10,
     color: COLORS.black,
     fontFamily: "Regular",
     lineHeight: 26,

  }}>Ngày nay, sự phát triển của nền kinh tế xã hội giúp người dân có thu nhập trung bình cao hơn, đồng nghĩa với nhu cầu về nhà ở cũng thay đổi, kéo theo xu hướng chuyển dịch về các khu vực có hạ tầng giao thông được quy hoạch đồng bộ.</Text>
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
    width:40,
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
    marginTop:-10,
    marginBottom:10,
 
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  infoText:{
    fontSize: 16,
    marginLeft: 5,
  },
  

})
export default NewsDetailScreen;