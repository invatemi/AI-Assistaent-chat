import { Message } from '../../app/store';

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-12 text-lg">Начните диалог...</div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-full sm:max-w-2xl px-5 py-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-black rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
              } message-text`}
            >
              {msg.content}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatMessages