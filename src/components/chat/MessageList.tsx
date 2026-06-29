import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import type { MessageProps } from "./Message";
import { subscribeMessages } from "../../services/firestoreMessages";

type Props = {
  channel: string;
};

export default function MessageList({ channel }: Props) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = subscribeMessages((msgs) => {
      setMessages(msgs.filter((m) => m.channel === channel));
    });

    return () => unsub();
  }, [channel]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, i) => (
        <Message key={i} {...msg} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}