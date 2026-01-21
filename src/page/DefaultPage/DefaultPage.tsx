import { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { useChatStore } from '../../app/store';
import { AppLayout } from '../../components';
import { ChatHeader } from '../../components';
import { ChatMessages } from '../../components';
import { ChatInput } from '../../components';

const DefaultPage = () => {
  const {
    chats,
    activeChatId,
    createNewChat,
    addMessageToActiveChat,
    updateLastMessageInActiveChat,
    setIsGenerating,
    appendToLastMessageInActiveChat,
    isGenerating,
  } = useChatStore();

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (chats.length === 0) {
      createNewChat('Добро пожаловать');
    }
  }, [chats.length, createNewChat]);

  const fetchAIResponse = async (userMessage: string) => {
    const currentActiveChatId = activeChatId;
    if (!currentActiveChatId) return;

    const aiMessage = {
      id: nanoid(),
      role: 'assistant' as const,
      content: '',
    };
    addMessageToActiveChat(aiMessage);
    setIsGenerating(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'phi3',
          messages: [{ role: 'user', content: userMessage }],
          stream: true,
        }),
        signal: abortController.signal,
      });

      if (!response.body) throw new Error('Нет тела ответа');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const json = JSON.parse(line);
              if (json.message?.content) {
                appendToLastMessageInActiveChat(json.message.content);
              }
              if (json.done) break;
            } catch (error) {
              console.warn('Ошибка парсинга:', line, error);
            }
          }
        }
      }
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        console.error('Ошибка AI:', e);
        updateLastMessageInActiveChat('Локальная модель недоступна. Запустите Ollama.');
      }
    } finally {
      abortControllerRef.current = null;
      setIsGenerating(false);
    }
  };

  const handleSend = async (text: string) => {
    const currentActiveChatId = activeChatId;
    if (!currentActiveChatId) return;

    const userMsg = {
      id: nanoid(),
      role: 'user' as const,
      content: text,
    };
    addMessageToActiveChat(userMsg);
    await fetchAIResponse(text);
  };

  const handleStopGenerating = () => {
    abortControllerRef.current?.abort();
    setIsGenerating(false);
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const messages = activeChat?.messages || [];

  return (
    <AppLayout>
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput
        onSend={handleSend}
        onStopGenerating={handleStopGenerating}
        isGenerating={isGenerating}
      />
    </AppLayout>
  );
};

export default DefaultPage;