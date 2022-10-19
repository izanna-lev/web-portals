import { createSlice } from "@reduxjs/toolkit";

interface chatListObject {
    otherUser: {
        _id: string
        name: string
        image: string
    },
    _id: string
    userRef: string
    channelRef: string
    lastMessageReadAt: string 
    message: {
        message: string
        userRef: string
        createdOn: string
    },
    createdOn: string
    updatedOn: string
    itineraryStatus: number
    unseenMessages: number
}

interface ChatList {
    data: chatListObject[];
    hasMore: boolean;
    page: number;
    size: number;
    total: number;
    limit: number;
}

const initialState: ChatList = {
    data: [],
    hasMore: false,
    page: 0,
    size: 0,
    total: 0,
    limit: 10,
};

const chatList = createSlice({
    name: "chatList",
    initialState,
    reducers: {
        getChat: (state, action: { payload: ChatList }) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { getChat } = chatList.actions;

export default chatList.reducer;
