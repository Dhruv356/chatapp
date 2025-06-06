import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from "../lib/axios";
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers: async() =>{
        set({isUserLoading:true});
        try {
             const res =await axiosInstance.get("/messages/users");
            set({users : res.data});
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");  
            
        }
        finally {
            set({isUserLoading:false});
        }
    },

  getMessages: async (userId) => {
  set({ isMessagesLoading: true });   // Start loading
  try {
    const res = await axiosInstance.get(`/messages/${userId}`);
    set({ messages: res.data });
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch messages");
  } finally {
    set({ isMessagesLoading: false });  // Stop loading
  }
},


   sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();
  if (!selectedUser) {
    toast.error("No user selected");
    return;
  }
  try {
  const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

    set({ messages: [...messages, res.data] });
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message");
  }
},

subscribeToMessage:() =>{
  const { selectedUser } = get();
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;
  socket.on("newMessage", (newMessage) => {
    const isMessageSentFromSelectedUser =newMessage.senderId === selectedUser._id;
if (!isMessageSentFromSelectedUser) return; // Ignore messages not from the selected user
    set({
      messages: [...get().messages, newMessage],
    });
  });
},

unsubscribeFromMessage: () => {
  const socket = useAuthStore.getState().socket;
  socket.off("newMessage");
},

  setSelectedUser: (user) => set({selectedUser: user}),
}));