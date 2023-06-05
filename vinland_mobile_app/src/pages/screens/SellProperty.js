import React,{useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView ,Image, Dimensions,  FlatList, TouchableOpacity, TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Slider } from "react-native-elements";
import COLORS from "../../constants/colors";
import houses from "../../constants/houses";


const SellProperty = (navigation,route ) => {
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

const [selectedPrice, setSelectedPrice] = useState(0);

const handlePriceChange = (value) => {
  setSelectedPrice(value);
};
const [description, setDescription] = useState("");

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };
  const [selectedRoomType, setSelectedRoomType] = useState("studio");

  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomType(roomType);
  };
  const handleUpdateInformation = () => {
    // Xử lý logic khi người dùng nhấn nút cập nhật thông tin
    console.log("Thông tin đã được cập nhật!");
  };


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
                  <Text style={styles.headerText}>Cập nhật bất động sản</Text>
                  </View>   
  <View style={styles.imageContainer}>
  <Image
    source={require("../../image/house5.jpg")}
    style={styles.image}
  />
  <TouchableOpacity
    style={styles.addButton}
    onPress={handleAddImage}
  >
    <Icon name="add" size={30} color={COLORS.white} />
  </TouchableOpacity>
</View>
        <FlatList
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
       value={selectedPrice}
       onValueChange={handlePriceChange}
     />
<Text style={styles.selectedPrice}>{selectedPrice.toFixed()} $</Text>
</View>
<View style={{ 
  marginTop: 20,
  paddingHorizontal: 10,}}>
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
  <View style={{ 
  marginTop: 20,
  paddingHorizontal: 10,}}>
  <Text style={{
   fontSize: 16,
   fontWeight: "bold",
   marginBottom: 5,
   marginTop:5
  }}>Địa chỉ:</Text>
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
                {/* {house.location.address + ", " + house.location.district + ", " + house.location.province} */}
              </Text>
            </View>
            </View>
            <View style={styles.roomTypeContainer}>
  <Text style={{
   fontSize: 16,
   fontWeight: "bold",
   marginBottom: 5,
   marginTop:5
  }}>Loại Phòng</Text>

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
            selectedRoomType === "2bathroom" && styles.selectedRoomTypeOption,
          ]}
          onPress={() => handleRoomTypeChange("2bathroom")}
        >
          <Text style={styles.roomTypeOptionText}>2 Bathroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roomTypeOption,
            selectedRoomType === "3bathroom" && styles.selectedRoomTypeOption,
          ]}
          onPress={() => handleRoomTypeChange("3bathroom")}
        >
          <Text style={styles.roomTypeOptionText}>3 Bathroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roomTypeOption,
            selectedRoomType === "4bathroom" && styles.selectedRoomTypeOption,
          ]}
          onPress={() => handleRoomTypeChange("4bathroom")}
        >
          <Text style={styles.roomTypeOptionText}>4 Bathroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roomTypeOption,
            selectedRoomType === "5bathroom" && styles.selectedRoomTypeOption,
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
  paddingHorizontal: 10,
  marginLeft:5
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
 imageContainer: {
  width: width - 20,
  height: 200,
  marginTop: 10,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
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
interiorList: {
  marginTop: 20,
  paddingHorizontal: 10,
},
interiorImage: {
  width: 120,
  height: 100,
  marginRight: 10,
  borderRadius: 10,
  resizeMode: "cover",
  marginTop:10,
},
priceSelectorContainer: {
  marginTop: 10,
  marginLeft: 5,
},
priceLabel: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 5,
},
slider: {
  width: 300,
  height: 40,
},
selectedPrice: {
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 5,
},
label: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 5,
},
descriptionContainer: {
  marginTop: 20,
  paddingHorizontal: 10,
},
textInputContainer: {
  backgroundColor: COLORS.lightGray,
  borderRadius: 5,
  padding: 10,
},
textInputContainer: {
  backgroundColor: COLORS.greylight,
  borderRadius: 15,
  padding: 10,
  width:300,
  height:160,

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
  backgroundColor: "blue",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  width:250,


},
updateButtonText: {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  textAlignVertical: "center",

},

});
export default SellProperty;