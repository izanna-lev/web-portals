import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

interface messageListObject {
    otherUser: {
        _id: String
        name: String
        image: String
    },
    _id: String
    messageType: number
    userRef: String
    channelRef: String
    lastMessageReadAt: String
    message: String
    createdOn: string
    updatedOn: String
    itineraryStatus: Number
    unseenMessages: Number
}

interface MessageList {
    data: {
        messages: messageListObject[];
        itinerary: {
            location: {
                location: string,
            },
            name: string
            image: string
            fromDate: string
        }
    }
    hasMore: boolean;
    page: number;
    size: number;
    total: number;
    limit: number;
}

const initialState: MessageList = {
    data: {
        messages: [],
        itinerary: {
            location: {
                location: '',
            },
            name: '',
            image: '',
            fromDate: ''
        },
    },
    hasMore: false,
    page: 0,
    size: 0,
    total: 0,
    limit: 10,
};

const messageList = createSlice({
    name: "messageList",
    initialState,
    reducers: {
        getMessages: (state: MessageList, action: { payload: MessageList }) => {
            console.log("messageList--->", action.payload)
            Object.assign(state, action.payload);
        },
    },
});

export const { getMessages } = messageList.actions;

export default messageList.reducer;
