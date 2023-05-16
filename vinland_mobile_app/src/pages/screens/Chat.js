import React from "react";
import { Text, View } from "react-native";
import ListRoom from '../../components/chat/list-room';

export default function Chat() {
  return (
    <View>
      <Text>My Chat</Text>
      <ListRoom />
    </View>
  );
}
