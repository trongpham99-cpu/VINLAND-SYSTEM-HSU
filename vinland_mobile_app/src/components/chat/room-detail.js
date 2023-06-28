import React, { useEffect, useState } from "react";
import { Button, TextInput, SafeAreaView, ScrollView, Image, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { IconButton } from "@react-native-material/core";
import { styles } from "./styles/room_detail.style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

//components 
import ListMessage from '../chat/list-message';
import { fetchMyRoom, fetchRoomDetail } from "../../services/room";
import socketService from "../../configs/socket";
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

    useEffect(() => {
        socketService.initializeSocket();
        socketService.emit('', { email: 'trong.phamtranduc@gmail.com' });
        return () => {

        }
    }, [])

    const sendMessage = () => {
        const data = {
            roomID: room._id,
            content: content,
            attachments: null,
        }
        setContent('');
        socketService.emit('send_message', data);
    }

    const height = Dimensions.get('window').height;

    return (
        <View>
            <ActivityIndicator style={{}} size="small" color="#0000ff" animating={loading} />
            <View style={styles.block_room}>
                <IconButton onPress={() => goBack()} style={styles.icon} icon={props => <Icon name="chevron-left" {...props} />} />
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
            <ScrollView style={{ ...styles.block_message, height: height - 294 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ListMessage
                        messages={messages}
                    />
                </SafeAreaView>
            </ScrollView>
            <View style={stylesInternal.footer} >
                <View style={styles.block_input}>
                    <IconButton style={styles.icon} icon={props => <Icon name="camera" {...props} />} />
                    <TextInput
                        style={styles.input}
                        placeholder="Aa"
                        onChangeText={text => setContent(text)}
                        value={content}
                    />
                    <IconButton
                        onPress={() => sendMessage()}
                        style={styles.icon} icon={props => <Icon name="send" {...props} />} />
                </View>
            </View>
        </View>
    )
}

const stylesInternal = {
    footer: {
        // position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    }
}

export default RoomDetail;