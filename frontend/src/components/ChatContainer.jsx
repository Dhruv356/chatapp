import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./Chatheader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utills";

import "./chatcontainer.css";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessage,
    unsubscribeFromMessage
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);

      subscribeToMessage();
      return () => {
        unsubscribeFromMessage();
      };

    }
  }, [selectedUser?._id, getMessages, subscribeToMessage, unsubscribeFromMessage]);

  useEffect(() => {
    if (messageEndRef.current && messages.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="chat-container loading">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader />

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-msg">Start the conversation ✨</div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === authUser._id;

            return (
              <div
                key={message._id}
                className={`message-wrapper ${isOwnMessage ? "message-end" : "message-start"}`}
                ref={messageEndRef}
              >
                {/* Avatar (left for others, right for own message) */}
                {!isOwnMessage && (
                  <div className="avatar">
                    <div className="avatar-img">
                      <img
                        src={selectedUser.profilePic || "/avatar.png"}
                        alt="profile"
                      />
                    </div>
                  </div>
                )}

                <div className="message-bubble">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="message-image"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                  <div className="message-time">
                    <time>{formatMessageTime(message.createdAt)}</time>
                  </div>
                </div>

                {isOwnMessage && (
                  <div className="avatar">
                    <div className="avatar-img">
                      <img
                        src={authUser.profilePic || "/avatar.png"}
                        alt="profile"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
