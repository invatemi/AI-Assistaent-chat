import { useState } from 'react';
import { Textarea } from '../../shared';
import { Button } from '../../shared';

const ChatInput = ({
  onSend,
  onStopGenerating,
  isGenerating,
}: {
  onSend: (text: string) => void;
  onStopGenerating: () => void;
  isGenerating: boolean;
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="border-t border-gray-200 p-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Сообщение AI Assistant…"
            disabled={isGenerating}
          />
          <Button onClick={handleSubmit} disabled={!input.trim() || isGenerating}>
            Отправить
          </Button>
        </div>

        {isGenerating && (
          <Button
            variant="danger"
            size="sm"
            onClick={onStopGenerating}
            className="mt-3 mx-auto block w-fit"
          >
            Остановить генерацию
          </Button>
        )}
      </div>
    </div>
  );
}

export default ChatInput