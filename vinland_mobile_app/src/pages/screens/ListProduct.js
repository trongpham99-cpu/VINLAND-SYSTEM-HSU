import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { approveHome, getAllHomePending } from '../../services/home';
import React, { useEffect } from "react";
import COLORS from "../../constants/colors";
import houses from "../../constants/houses";

export default function ListProduct({ navigation }) {

  const [home, setHome] = React.useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
      _getAllHomePending();
    });
    return unsubscribe;
  }, [navigation]);

  const _getAllHomePending = async () => {
    getAllHomePending().then((res) => {
      if (res) {
        setHome(res);
      }
    });
  }

  const onApprove = (id) => {
    approveHome(id).then((res) => {
      if (res) {
        console.log("Approve: ", res);
        _getAllHomePending();
      }
    });
  }

  const onReject = (id) => {
    console.log("Reject: ", id);
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn từ chối?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Đồng ý",
          onPress: () => console.log("OK Pressed")
        }
      ],
      { cancelable: false }
    );
  }

  const CardItem = ({ houses: home }) => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.bgColor,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: COLORS.tittleColor,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: COLORS.tittleColor,
              fontFamily: "Bold",
              fontSize: 20,
              marginBottom: 5,
            }}
          >
            {houses.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon name="schedule" size={18} color={COLORS.grey} />
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {home.createdAt}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon name="today" size={18} color={COLORS.grey} />
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {home.title}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="person" size={18} color={COLORS.grey} />
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {home.owner.username}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => onReject(home._id)}
            style={styles.headerBtnClose}
          >
            <Icon
              name="close"
              size={20}
              style={{ textAlign: "center" }}
              color={"#F44336"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtnDone}
            onPress={() => onApprove(home._id)}
          >
            <Icon
              name="done"
              size={20}
              style={{ textAlign: "center" }}
              color={"#0D47A1"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
        <Text style={styles.txtIcon}>Danh sách dự án</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.bgColor,
          marginTop: 20,
        }}
      >
        <FlatList
          data={home}
          renderItem={({ item }) => {
            return <CardItem houses={item} />;
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}
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
  headerBtnClose: {
    height: 40,
    width: 40,
    backgroundColor: "#FFEBEE",
    borderRadius: 10,
    margin: 5,
    justifyContent: "center",
  },
  headerBtnDone: {
    height: 40,
    width: 40,
    margin: 5,
    backgroundColor: "#E1F5FE",
    borderRadius: 10,
    justifyContent: "center",
  },
  txtIcon: {
    marginLeft: 26,
    fontFamily: "Bold",
    fontSize: 24,
  },

  tittle: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    fontSize: 20,
    fontFamily: "Bold",
  },
});
