import React, { useEffect } from "react";
import { Text, View } from "react-native";
import socketService from "../../configs/socket";

//services

const ListRoom = (props) => {

    getListRoom = (data) => {
        console.log(data);
    }

    useEffect(() => {
        socketService.initializeSocket();
        return () => {
            console.log("ListRoom unmount");
        }

    }, []);

    return (
        <View>
            <Text>My List Room</Text>
        </View>
    )
}

export default ListRoom;