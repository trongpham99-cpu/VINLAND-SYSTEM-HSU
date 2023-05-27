import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator } from "react-native";
import ListRoom from '../../components/chat/list-room';
import socketService from "../../configs/socket";
import { fetchMyRoom } from "../../services/room";

export default function Chat({ navigation }) {

  const [rooms, setRooms] = useState();
  const [loading, setLoading] = useState(true);

  const _fetchMyRooms = async () => {
    setLoading(true);
    let response = await fetchMyRoom();
    if (response) {
      setRooms(response);
    }
    setLoading(false);
  }

  useEffect(() => {
    socketService.initializeSocket();

    // socketService.on('get_my_rooms', (data) => {
    //   console.log(data);
    // });
    socketService.emit('get_my_rooms', { email: 'trong.phamtranduc@gmail.com' });
    return () => {
      socketService.removeAllListeners('connect');
      socketService.removeAllListeners('disconnect');
      socketService.removeAllListeners('connect_error');
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
