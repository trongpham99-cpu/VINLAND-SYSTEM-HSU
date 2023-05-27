import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import ListRoom from '../../components/chat/list-room';
import RoomDetail from '../../components/chat/room-detail';
import socketService from "../../configs/socket";

export default function Chat({ navigation }) {

  const [rooms, setRooms] = useState([
    {
      name: "Room 1",
      avatar: "https://picsum.photos/200",
      messages: [],
      users: [],
      last_message: "Hello"
    },
    {
      name: "Room 2",
      avatar: "https://picsum.photos/200",
      messages: [],
      users: [],
      last_message: "Hôm nay trời đẹp quá, đi chơi không?"
    }
  ]);

  useEffect(() => {
    socketService.initializeSocket();
    
    socketService.on('get_my_rooms', (data) => {
      console.log(data);
    });

    socketService.emit('get_my_rooms', { email: 'trong.phamtranduc@gmail.com' });
    return () => {
      socketService.removeAllListeners('connect');
      socketService.removeAllListeners('disconnect');
      socketService.removeAllListeners('connect_error');
    }
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <ListRoom rooms={rooms} navigation={navigation}/> */}
        <RoomDetail
          navigation={navigation} />
      </SafeAreaView>
    </ScrollView>
  );
}
