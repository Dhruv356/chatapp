import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeletons";
import { Users } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers = [], authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  const filteredUsers = users
    .filter(user => String(user._id) !== String(authUser?._id))
    .filter(user => !showOnlineOnly || onlineUsers.includes(user._id));

  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar-header">
        <div className="chat-sidebar-title">
          <Users className="chat-sidebar-icon" />
          <span className="chat-sidebar-label">Contacts</span>
        </div>

       <label className="chat-toggle-checkbox">
  <input
    type="checkbox"
    checked={showOnlineOnly}
    onChange={() => setShowOnlineOnly(!showOnlineOnly)}
  />
  <span className="chat-toggle-label">
    {showOnlineOnly ? "Show Online Only" : "Show All Users"}
  </span>
</label>

      </div>

      <div className="chat-contact-list">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`chat-contact ${selectedUser?._id === user._id ? "chat-contact-active" : ""}`}
          >
            <div className="chat-avatar-container">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="chat-avatar"
              />
              {onlineUsers.includes(user._id) && <span className="chat-status-dot" />}
            </div>

            <div className="chat-user-details">
              <span className="chat-user-name">{user.fullName}</span>
              <span className="chat-user-status">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="chat-empty">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
