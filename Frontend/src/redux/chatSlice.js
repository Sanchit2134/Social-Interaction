import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        onlineUsers: [],
        messages: [],
    },
    reducers:{
        setOnlineUsers: (state,action)=>{
            state.onlineUsers = action.payload;
        },
        setMessages: (state,action)=>{
            state.messages = action.payload;
        },
        addMessage: (state,action)=>{
            const newMessage = action.payload;
            // Check if message already exists to prevent duplicates
            const messageExists = state.messages.some(msg => {
                const msgId = msg._id?.toString ? msg._id.toString() : msg._id;
                const newMsgId = newMessage._id?.toString ? newMessage._id.toString() : newMessage._id;
                return msgId === newMsgId;
            });
            if (!messageExists) {
                state.messages.push(newMessage);
            }
        },
        clearMessageNotification: (state) => {
      state.messages = [];
    },
    }
});
export const {setOnlineUsers, setMessages, addMessage, clearMessageNotification} = chatSlice.actions;
export default chatSlice.reducer;