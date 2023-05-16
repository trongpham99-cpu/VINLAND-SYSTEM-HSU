import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React from "react";

export default function FormInput(props) {
  const { placeholder, source, error } = props;

  return (
    <View>
      <View>
        {error ? (
          <Text
            style={{
              color: "red",
              fontSize: 14,
              marginLeft: 200,
              textAlign: "right",
              marginRight: 20,
            }}
          >
            {error}
          </Text>
        ) : null}
      </View>
      <View style={styles.inputAuth}>
        <Image
          style={{ width: 20, height: 20, marginHorizontal: 20 }}
          source={source}
        />
        <TextInput
          {...props}
          style={styles.txtInput}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputAuth: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  txtInput: {
    width: 350,
    height: 50,
    alignItems: "center",
  },
});
