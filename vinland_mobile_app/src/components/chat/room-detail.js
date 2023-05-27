import React, { useEffect, useState } from "react";
import { Button, TextInput, SafeAreaView, ScrollView, Image, Text, View, ActivityIndicator } from "react-native";
import { IconButton } from "@react-native-material/core";
import { styles } from "./styles/room_detail.style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

//components 
import ListMessage from '../chat/list-message';
import { fetchMyRoom, fetchRoomDetail } from "../../services/room";
const RoomDetail = (props) => {

    const { navigation, id } = props;

    const goBack = () => {
        navigation.goBack();
    }

    const [room, setRoom] = useState({});
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const _fetchRoom = async () => {
        setLoading(true);
        let response = await fetchRoomDetail(id);
        if (response) {
            setRoom(response);
            setMessages(response.messages);
        }
        setLoading(false);
    }

    useEffect(() => {
        _fetchRoom();
    }, []);

    return (

        <View>
            <ActivityIndicator style={{}} size="small" color="#0000ff" animating={loading} />
            <View style={styles.block_room}>
                <IconButton onPress={()=> goBack()} style={styles.icon} icon={props => <Icon name="chevron-left" {...props} />} />
                <Image style={styles.tinyLogo}
                    source={{
                        uri: `${room.avatar}`,
                    }}
                />
                <View style={{ flex: 1 }} >
                    <Text style={styles.name_room} >{room.name}</Text>
                    <Text style={styles.user_name} >{room.last_message}</Text>
                </View>
            </View>
            <ScrollView style={styles.block_message} >
                <SafeAreaView style={{ flex: 1 }}>
                    <ListMessage
                        messages={messages}
                    />
                </SafeAreaView>
            </ScrollView>
            <View style={{ flex: 1 }}>
                <View style={styles.block_input}>
                    <IconButton style={styles.icon} icon={props => <Icon name="camera" {...props} />} />
                    <TextInput
                        style={styles.input}
                        placeholder="Aa"
                        onChangeText={text => setContent(text)}
                        value={content}
                    />
                    <IconButton style={styles.icon} icon={props => <Icon name="send" {...props} />} />
                </View>
            </View>
        </View>
    )
}

export default RoomDetail;