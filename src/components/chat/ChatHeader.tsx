type Props = {
  channel: string;
};

export default function ChatHeader({ channel }: Props) {
  return (
    <div className="chat-header">
      <h2># {channel}</h2>
    </div>
  );
}