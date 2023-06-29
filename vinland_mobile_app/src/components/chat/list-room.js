import React, { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import Room from './room';
//css
import { styles } from '../../components/chat/styles/list_room.style';
const ListRoom = (props) => {
    const { rooms = [], navigation = {}} = props;
    useEffect(() => {

        return () => {
        }

    }, []);

    return (
        <View>
            <Text style={styles.title} >Danh sách liên hệ</Text>
            <View >
                <TextInput style={styles.input_search} placeholder="Tìm kiếm" />
            </View>
            {rooms.map((room, index) => {
                return <Room
                    key={index}
                    room={room}
                    navigation={navigation}
                />
            })}
        </View>
    )
}

export default ListRoom;