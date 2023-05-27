import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from '../../components/chat/styles/room.style';
export const Room = (props) => {

    const { room = {}, navigation = {} } = props;

    return (
        <TouchableOpacity style={styles.block_room} onPress={() => navigation.navigate('ChatDetail', { room })} >
            <View style={styles.block_room}  >
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: `${room.avatar}`,
                    }}
                />
                <View style={{ flex: 1 }} >
                    <Text style={styles.name_room} >{room.name}</Text>
                    <Text style={styles.last_message} >{room.messages?.length ? room.messages[room.messages.length - 1].content : ""}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Room;