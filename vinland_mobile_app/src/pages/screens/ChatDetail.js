import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import RoomDetail from "../../components/chat/room-detail";
import room from "../../services/room";

export default function ChatDetail(props) {
  const { navigation } = props;
  const { room = {} } = props.route.params;
  const { _id } = room;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RoomDetail navigation={navigation} id={_id} />
    </SafeAreaView>
  );
}
