import { Message as MessageType } from "../ChatMessages"

const Message = ({ message }: { message: MessageType }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3xl px-5 py-4 rounded-2xl ${
          isUser
            ? 'bg-gray-100 rounded-br-none'
            : 'bg-white rounded-bl-none border border-gray-200'
        } text-gray-800 prose prose-sm leading-relaxed`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default Message