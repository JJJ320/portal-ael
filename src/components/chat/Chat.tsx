import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

import "../../styles/chat.css";

export default function Chat() {
  const [channel, setChannel] = useState("geral");

  return (
    <div className="chat-container">

      <ChatSidebar
        selected={channel}
        onSelect={setChannel}
      />

      <div className="chat-main">

        <ChatHeader channel={channel} />

        <div className="chat-messages">
          <MessageList channel={channel} />
        </div>

        <div className="chat-input-wrapper">
          <ChatInput channel={channel} />
        </div>

      </div>
    </div>
  );
}