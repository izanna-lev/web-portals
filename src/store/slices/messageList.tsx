import { createSlice } from "@reduxjs/toolkit";

interface messageListObject {
  otherUser: {
    _id: string;
    name: string;
    image: string;
  };
  _id: string;
  messageType: number;
  userRef: string;
  channelRef: string;
  lastMessageReadAt: string;
  message: string;
  createdOn: string;
  updatedOn: string;
  itineraryStatus: number;
  unseenMessages: number;
}

interface MessageList {
  messages: messageListObject[];
  itinerary: {
    location: string;

    name: string;
    otherUserName: string;
    image: string;
    fromDate: string;
    userImage: string;
    blockedByTraveller: boolean;
    itineraryStatus: number;
  };

  hasMore: boolean;
  page: number;
  size: number;
  total: number;
  limit: number;
}

const initialState: MessageList = {
  messages: [],
  itinerary: {
    location: "",

    name: "",
    image: "",
    fromDate: "",
    otherUserName: "",
    userImage: "",
    blockedByTraveller: false,
    itineraryStatus: 1,
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
      return action.payload;
    },
  },
});

export const { getMessages } = messageList.actions;

export default messageList.reducer;
