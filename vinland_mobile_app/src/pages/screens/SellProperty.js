import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Slider } from "react-native-elements";
import COLORS from "../../constants/colors";
import houses from "../../constants/houses";

export default function SellProperty({ navigation, route }) {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("studio");
  const item = route.params;
  // console.log(JSON.stringify(item));

  const interiors = [
    require("../../image/interior1.jpg"),
    require("../../image/interior2.jpg"),
    require("../../image/interior3.jpg"),
  ];
  const handleAddImage = () => {
    // Xử lý logic khi người dùng muốn thêm ảnh
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomType(roomType);
  };
  const handleUpdateInformation = () => {
    // Xử lý logic khi người dùng nhấn nút cập nhật thông tin
    console.log("Thông tin đã được cập nhật!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-ios"
            size={24}
            onPress={navigation.goBack}
          />
        </View>
        <Text style={styles.headerText}>Cập nhật bất động sản</Text>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../image/house5.jpg")}
            style={styles.image}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
            <Icon name="add" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          // style={{ alignItems: "center" }}
          data={interiors}
          horizontal
          renderItem={({ item }) => (
            <Image source={item} style={styles.interiorImage} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.priceSelectorContainer}>
          <Text style={styles.priceLabel}>Chọn giá bán:</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={7000}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: COLORS.btnColor,
            }}
            value={selectedPrice}
            onValueChange={handlePriceChange}
          />
          <Text style={styles.selectedPrice}>{selectedPrice.toFixed()} $</Text>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.label}>Nêu mô tả:</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={handleDescriptionChange}
              placeholder="Nhập mô tả của bạn"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Bold",
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            Địa chỉ:
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon name="place" size={18} color={COLORS.blue} />
            <TextInput
              style={{
                width: "95%",
                height: 40,
                color: COLORS.tittleColor,
                fontFamily: "Regular",
                fontSize: 16,
                backgroundColor: COLORS.greylight,
                borderRadius: 5,
              }}
            >
              {/* {house.location.address + ", " + house.location.district + ", " + house.location.province} */}
            </TextInput>
          </View>
        </View>
        <View style={styles.roomTypeContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            Loại Phòng
          </Text>

          <View style={styles.roomTypeOptions}>
            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "studio" && styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("studio")}
            >
              <Text style={styles.roomTypeOptionText}>Studio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "2bathroom" &&
                  styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("2bathroom")}
            >
              <Text style={styles.roomTypeOptionText}>2 Bathroom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "3bathroom" &&
                  styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("3bathroom")}
            >
              <Text style={styles.roomTypeOptionText}>3 Bathroom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "4bathroom" &&
                  styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("4bathroom")}
            >
              <Text style={styles.roomTypeOptionText}>4 Bathroom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "5bathroom" &&
                  styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("5bathroom")}
            >
              <Text style={styles.roomTypeOptionText}>5 Bathroom</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateInformation}
        >
          <Text style={styles.updateButtonText}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
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
  headerText: {
    fontFamily: "Bold",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 50,
  },
  imageContainer: {
    width: width - 20,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  addButton: {
    position: "absolute",
    backgroundColor: COLORS.blue,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  interiorImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
    marginTop: 10,
    marginLeft: 10,
  },
  priceSelectorContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: "Bold",
    fontSize: 19,
    marginBottom: 5,
  },
  slider: {
    width: 250,
    height: 40,
  },
  selectedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  label: {
    fontSize: 18,
    fontFamily: "Bold",
    marginBottom: 5,
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textInputContainer: {
    backgroundColor: COLORS.greylight,
    borderRadius: 15,
    padding: 10,
    width: "100%",
    height: 100,
  },
  roomTypeContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  roomTypeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  roomTypeOptions: {
    flexDirection: "row",
  },
  roomTypeOption: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  selectedRoomTypeOption: {
    backgroundColor: COLORS.blue,
  },
  roomTypeOptionText: {
    fontSize: 14,
    color: "black",
  },
  updateButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: COLORS.btnColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 250,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 6f73e8265d1d3a8c3bf8ab8af2368e88b6e5c565
