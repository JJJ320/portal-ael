import { useEffect, useState } from "react";

import {
  subscribeChannels,
  createChannel,
} from "../../services/firestoreChannels";

import type { Channel } from "../../services/firestoreChannels";

type Props = {
  selected: string;
  onSelect: (channel: string) => void;
};

export default function ChatSidebar({ selected, onSelect }: Props) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [newChannel, setNewChannel] = useState("");

  useEffect(() => {
    const unsub = subscribeChannels(setChannels);
    return () => unsub();
  }, []);

  async function addChannel() {
    if (!newChannel.trim()) return;

    await createChannel(newChannel);
    setNewChannel("");
  }

  return (
    <div className="chat-sidebar">

      <h3>Canais</h3>

      {channels.map((c) => (
        <div
          key={c.id}
          className={`channel ${selected === c.name ? "active" : ""}`}
          onClick={() => onSelect(c.name)}
        >
          # {c.name}
        </div>
      ))}

      <div className="channel-create">
        <input
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
          placeholder="novo canal"
        />
        <button onClick={addChannel}>+</button>
      </div>

    </div>
  );
}