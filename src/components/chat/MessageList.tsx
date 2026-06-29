import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import type { MessageProps } from "./Message";

export default function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("horario", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: MessageProps[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as MessageProps),
      }));

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">

      {messages.map((msg, index) => (
        <Message
          key={index}
          {...msg}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}