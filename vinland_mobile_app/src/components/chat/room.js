import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from '../../components/chat/styles/room.style';
export const Room = (props) => {

    const { room = {}, navigation = {} } = props;

    const ViewDetailRoom = () => {
        console.log("ViewDetailRoom");
    }

    return (
        <TouchableOpacity style={styles.block_room} onPress={() => ViewDetailRoom()} >
            <View style={styles.block_room}  >
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: `${room.avatar}`,
                    }}
                />
                <View style={{ flex: 1 }} >
                    <Text style={styles.name_room} >{room.name}</Text>
                    <Text style={styles.last_message} >{room.last_message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Room;