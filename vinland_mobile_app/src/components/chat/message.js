import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from '../../components/chat/styles/message.style';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Message = (props) => {
    const [id, setId] = React.useState(null);

    const getId = async () => {
        let id = await AsyncStorage.getItem("user_id")
        setId(id)
    }

    useEffect(() => {
        getId();
    }, [])

    const { message = {} } = props;
    const { user: { _id } } = message;
    const isMe = _id === id ? true : false;

    const renderTextMessage = () => {
        return (
            <Text style={{ ...styles.content_message, color: isMe ? '#fff' : '#000', }}>{message.content}</Text>
        )
    }

    const renderImageMessage = () => {
        return (
            <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcToLnqbYc5a-th6mJfyKNvD3qHBJt09E68f81holSw&s" }}
                style={{ width: 200, height: 200 }}
            />
        )
    }

    const renderMessage = () => {
        const { type } = message;
        switch (type) {
            case 'text':
                return renderTextMessage();
            case 'image':
                return renderImageMessage();
            default:
                return null;
        }
    }

    return (
        <View
            style={{
                ...styles.block_message,
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                backgroundColor: isMe ? '#7813ab' : '#fff',
            }}
        >
            {renderMessage()}
        </View>
    )
}

export default Message;