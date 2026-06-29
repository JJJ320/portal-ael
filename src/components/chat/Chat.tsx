import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "../../styles/chat.css";

export default function Chat() {
  return (
    <div className="chat-container">

      {/* Área das mensagens */}
      <div className="chat-messages">
        <MessageList />
      </div>

      {/* Área de input */}
      <div className="chat-input-wrapper">
        <ChatInput />
      </div>

    </div>
  );
}