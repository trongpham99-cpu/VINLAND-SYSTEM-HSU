import React, { useEffect, useState } from "react";
import { Button, TextInput, SafeAreaView, ScrollView, Image, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { IconButton } from "@react-native-material/core";
import { styles } from "./styles/room_detail.style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

//components 
import ListMessage from '../chat/list-message';
import { fetchRoomDetail } from "../../services/room";
import { sendMessage } from "../../services/message";
import { onEmit, onListen, onOff } from "../../configs/socket";
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
            const newMessage = [...response.messages]
            newMessage.reverse();
            setMessages(newMessage);
        }
        setLoading(false);
    }

    useEffect(() => {
        _fetchRoom();
    }, []);

    useEffect(() => {
        onEmit("join_room", room._id);
        onListen("on_new_room", onNewRoom);

        return () => {
            onEmit("leave_room", room._id);
            onOff("on_new_room", onNewRoom);
        }
    }, [room])

    const onNewRoom = async (room) => {
        const newMessage = [...room.messages]
        newMessage.reverse();
        setMessages(newMessage);
    }

    useEffect(() => {

    }, [])

    const onSendMessage = () => {
        const data = {
            roomId: room._id,
            content: content,
            attachments: null,
            type: "text"
        }

        if (data.attachments && data.attachments.length > 0) {
            data.type = 'image'
        }

        sendMessage(data).then(res => {
            setContent('');
            onEmit('on_new_room', data.roomId);
        }, err => {
            console.log(err);
        })
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
                        onPress={() => onSendMessage()}
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