import { useState } from "react";

import Header from "../components/Header";

import Sidebar from "../components/chat/Sidebar";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";

import "../styles/chat.css";

export default function Chat() {
  const [channel, setChannel] = useState("geral");

  return (
    <>
      <Header />

      <div className="chat-page">

        <Sidebar
          channel={channel}
          setChannel={setChannel}
        />

        <div className="chat-center">

          <ChatHeader
            channel={channel}
          />

          <MessageList
            channel={channel}
          />

          <ChatInput
            channel={channel}
          />

        </div>

        <ChatSidebar />

      </div>

    </>
  );
}