import React from "react";
import { MessageSquare } from "lucide-react";
import "./nochatselected.css";

const NoChatSelected = () => {
  return (
    <div className="no-chat-container">
      <div className="no-chat-content">
        <div className="icon-wrapper">
          <div className="icon-bounce">
            <MessageSquare className="chat-icon" />
          </div>
        </div>
        <h2 className="welcome-title">Welcome to Chatty!</h2>
        <p className="welcome-text">Select a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
