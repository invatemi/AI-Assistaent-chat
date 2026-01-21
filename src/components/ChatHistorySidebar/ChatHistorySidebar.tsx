import { useState } from 'react';
import { useChatStore } from '../../app/store';
import { Button } from '../../shared';
import { Card } from '../../shared';

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'сегодня';
  if (date.toDateString() === yesterday.toDateString()) return 'вчера';

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
  }).format(date);
};

const ChatHistorySidebar = () => {
  const { chats, activeChatId, setActiveChat, createNewChat, deleteChat } = useChatStore();
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Удалить этот чат?')) {
      deleteChat(id);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shrink-0 mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">История чатов</h2>
      </div>

      <div className="px-4 py-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => createNewChat()}
          className="w-full"
        >
          + Новый чат
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-6 space-y-1.5">
        <Card className="p-2">
          {chats.length === 0 ? (
            <div className="text-center text-gray-400 text-xs py-4">Нет чатов</div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
                className={`p-3 rounded-lg cursor-pointer relative transition-colors pl-8 ${
                  activeChatId === chat.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                {(hoveredChatId === chat.id || activeChatId === chat.id) && (
                  <button
                    onClick={(e) => handleDelete(chat.id, e)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-xs font-medium whitespace-nowrap"
                  >
                    Удалить
                  </button>
                )}

                <div className="font-medium text-sm text-gray-900 line-clamp-2 min-h-[36px]">
                  {chat.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">{formatDate(chat.createdAt)}</div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatHistorySidebar;