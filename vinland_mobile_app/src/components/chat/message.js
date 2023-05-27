import React from "react";
import { Text, View } from "react-native";
import { styles } from '../../components/chat/styles/message.style';
const Message = (props) => {

    const { message = {} } = props;
    const isMe = message.user._id === 2 ? true : false;
    
    return (
        <View
            style={{
                ...styles.block_message,
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                backgroundColor: isMe ? '#7813ab' : '#fff',
            }}
        >
            <Text
                style={{
                    ...styles.content_message,
                    color: isMe ? '#fff' : '#000',
                }}
            >{message.content}</Text>
        </View>
    )
}

export default Message;