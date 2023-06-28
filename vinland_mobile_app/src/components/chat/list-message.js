import React from "react";
import { Text, View } from "react-native";

//component
import Message from './message';

const ListMessage = (props) => {

    const { messages = [] } = props;
    
    return (
        <View>
            {messages.map((message, index) => {
                return <Message message={message} key={index} />
            })}
        </View>
    )
}

export default ListMessage;