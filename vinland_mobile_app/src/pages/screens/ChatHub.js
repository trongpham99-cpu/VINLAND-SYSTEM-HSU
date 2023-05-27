import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Components
import Chat from "./Chat";
import ChatDetail from "./ChatDetail";

const Stack = createStackNavigator();
export default function ChatNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Chat"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="ChatDetail" component={ChatDetail} />
        </Stack.Navigator>
    );
}
