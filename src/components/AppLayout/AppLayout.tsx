import { ReactNode } from 'react';
import { ChatHistorySidebar } from '../ChatHistorySidebar';
import { Card } from '../../shared';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="flex max-w-6xl mx-auto gap-6">
        <ChatHistorySidebar />
        <div className="flex-1">
          <Card className="h-full flex flex-col">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;