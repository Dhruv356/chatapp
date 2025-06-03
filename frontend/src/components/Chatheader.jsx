import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import "./chatheader.css"; // Your new style file
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id);
  const { authUser } = useAuthStore();
useEffect(() => {
  if (selectedUser?._id === authUser?._id) {
    setSelectedUser(authUser); // ✅ force update if user updated own profile
  }
}, [authUser]);
  return (
    <div className="chat-header">
      <div className="chat-header-content">
        <div className="chat-header-left">
          <div className="chat-avatar-container">
            <img
              className="chat-avatar"
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
            />
            {isOnline && <div className="chat-status-dot" />}
          </div>
          <div className="chat-user-details">
            <h3 className="chat-user-name">{selectedUser?.fullName}</h3>
            <p className="chat-user-status">{isOnline ? "Online" : "Offline"}</p>
          </div>
        </div>

        <button className="chat-close-button" onClick={() => setSelectedUser(null)}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
