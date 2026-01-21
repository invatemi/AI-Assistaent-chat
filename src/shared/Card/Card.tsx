import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card