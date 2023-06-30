import React, { useEffect, useState } from "react";
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
import { Input, Slider } from "react-native-elements";
import COLORS from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { uploadSingleImage } from "../../services/upload";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addHome } from "../../services/home";
// import ImageModal from 'react-native-image-modal';

export default function SellProperty({ navigation, route }) {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("1");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === "granted");
    })();
  }, []);

  const getImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const { uri } = result;

    const formData = new FormData();
    formData.append("file", {
      name: result.uri.split("/").pop(),
      type: "image/jpeg",
      uri: uri,
    });

    uploadSingleImage(formData)
      .then((res) => {
        if (res.data) {
          const { url } = res.data;
          setImages([...images, url]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddImage = async () => {
    getImagePicker();
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
    const newLocation = location.split(",");
    const home = {
      attachments: images,
      comments: [],
      description: description,
      location: {
        address: newLocation[0],
        district: newLocation[1],
        province: newLocation[2],
      },
      note: "",
      price: Math.round(selectedPrice),
      rating: 0,
      type: selectedRoomType,
      thumbnail: images,
      title: title,
    };
    addHome(home)
      .then((res) => {
        alert("Thêm bất động sản thành công, vui lòng chờ admin duyệt");
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Text style={styles.headerText}>Đăng tin bất động sản</Text>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../../image/house5.jpg")}
            style={styles.image}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
            <Icon name="camera" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={images}
          horizontal
          renderItem={({ item: uri }) => {
            return <Image source={{ uri }} style={styles.interiorImage} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Bold",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            Nhập tên dự án cần đăng:
          </Text>
          <TextInput
            style={{
              backgroundColor: COLORS.greylight,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              borderRadius: 10,
            }}
            // multiline
            numberOfLines={2}
            value={title}
            onChangeText={(e) => setTitle(e)}
            placeholder="Nhập tên dựa án"
            placeholderTextColor={COLORS.grey}
          />
        </View>
        <View style={styles.priceSelectorContainer}>
          <Text style={styles.priceLabel}>
            Giá bán/Cho thuê (Đơn vị: /VND):
          </Text>
          <TextInput
            style={{
              backgroundColor: COLORS.greylight,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              borderRadius: 10,
            }}
            value={selectedPrice}
            onChangeText={handlePriceChange}
            placeholder="Nhập giá bán/cho thuê"
            placeholderTextColor={COLORS.grey}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.label}>Mô tả về dự án:</Text>
          <TextInput
            style={styles.textInputContainer}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Nhập mô tả về dự án "
            placeholderTextColor={COLORS.grey}
          />
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
          <TextInput
            style={{
              backgroundColor: COLORS.greylight,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 20,
              borderRadius: 10,
            }}
            // multiline
            numberOfLines={4}
            value={location}
            onChangeText={(e) => setLocation(e)}
            placeholder="Nhập địa chỉ" //Đường, Quận, Thành phố
            placeholderTextColor={COLORS.grey}
          />
        </View>
        <View style={styles.roomTypeContainer}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Bold",
              marginBottom: 10,
              marginTop: 5,
            }}
          >
            Loại Hình:
          </Text>
          <View style={styles.roomTypeOptions}>
            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "1" && styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("1")}
            >
              <Text style={styles.roomTypeOptionText}>Căn hộ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "2" && styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("2")}
            >
              <Text style={styles.roomTypeOptionText}>Nhà cho thuê</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roomTypeOption,
                selectedRoomType === "3" && styles.selectedRoomTypeOption,
              ]}
              onPress={() => handleRoomTypeChange("3")}
            >
              <Text style={styles.roomTypeOptionText}>Chung cư</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateInformation}
        >
          <Text style={styles.updateButtonText}>Đăng thông tin</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
    flexDirection: "column",
  },
  priceLabel: {
    fontSize: 18,
    fontFamily: "Bold",
    fontSize: 19,
    marginBottom: 10,
  },
  selectedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  label: {
    fontSize: 18,
    fontFamily: "Bold",
    marginBottom: 10,
  },
  descriptionContainer: {
    // marginTop: 20,
    // paddingHorizontal: 10,
  },
  textInputContainer: {
    backgroundColor: COLORS.greylight,
    borderRadius: 10,
    width: "100%",
    height: 120,
    paddingLeft: 20,
  },
  roomTypeContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  roomTypeLabel: {
    fontSize: 18,
    fontFamily: "Bold",
    marginBottom: 10,
  },
  roomTypeOptions: {
    flexDirection: "row",
  },
  roomTypeOption: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.greylight,
    borderRadius: 20,
    color: "black",
  },
  selectedRoomTypeOption: {
    backgroundColor: "#40C4FF",
    color: "white",
    padding: 20,
  },
  roomTypeOptionText: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "black",
  },
  updateButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: COLORS.btnColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 300,
  },
  updateButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Bold",
    textAlign: "center",
  },
});
