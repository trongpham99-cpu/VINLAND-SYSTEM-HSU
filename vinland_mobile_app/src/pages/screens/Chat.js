import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator } from "react-native";
import ListRoom from '../../components/chat/list-room';
import { fetchMyRoom } from "../../services/room";

export default function Chat({ navigation }) {

  const [rooms, setRooms] = useState();
  const [loading, setLoading] = useState(true);

  const _fetchMyRooms = async () => {
    setLoading(true);
    let response = await fetchMyRoom();
    if (response) {
      console.log(response)
      setRooms(response);
    }
    setLoading(false);
  }

  const onListRoom = rooms => {
    setRooms(rooms);
  }

  useEffect(() => {
  
    return () => {

    }
  }, []);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //call api
      _fetchMyRooms();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <ListRoom rooms={rooms} navigation={navigation} />
        <ActivityIndicator size="small" color="#0000ff" animating={loading} />
      </SafeAreaView>
    </ScrollView>
  );
}
