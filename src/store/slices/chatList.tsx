import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface chatListObject {
    otherUser: {
        _id: String
        name: String
        image: String
    },
    _id: String
    userRef: String
    channelRef: String
    lastMessageReadAt: String 
    message: String
    createdOn: string
    updatedOn: String
    itineraryStatus: Number
    unseenMessages: Number
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
        getChat: (state: ChatList, action: { payload: ChatList }) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { getChat } = chatList.actions;

export default chatList.reducer;
