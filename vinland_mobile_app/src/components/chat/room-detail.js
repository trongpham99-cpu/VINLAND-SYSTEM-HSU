import React, { useEffect, useState } from "react";
import { Button, TextInput, SafeAreaView, ScrollView, Image, Text, View } from "react-native";
import { IconButton } from "@react-native-material/core";
import { styles } from "./styles/room_detail.style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

//components 
import ListMessage from '../chat/list-message';
const RoomDetail = (props) => {

    const { navigation } = props;

    const [room, setRoom] = useState({
        name: "Mua bán nhà đất quận 7",
        avatar: "https://picsum.photos/200",
        messages: [],
        users: [],
        last_message: "Hello"
    });

    const [messages, setMessages] = useState([
        {
            id: 1,
            content: "Hello",
            user: {
                _id: 1,
                username: "admin",
                avatar: "https://picsum.photos/200"
            },
            attachments: []
        },
        {
            id: 2,
            content: "Hi",
            user: {
                _id: 2,
                username: "user",
                avatar: "https://picsum.photos/200"
            },
            attachments: []
        },
        {
            id: 3,
            content: "Hi",
            user: {
                _id: 2,
                username: "user",
                avatar: "https://picsum.photos/200"
            },
            attachments: []
        }]);
    const [content, setContent] = useState('');
    return (
        <View>
            <View style={styles.block_room}>
                <IconButton style={styles.icon} icon={props => <Icon name="chevron-left" {...props} />} />
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