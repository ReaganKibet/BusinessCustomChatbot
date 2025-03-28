import React from 'react';
import { MessageCircle, Bot, Brain } from 'lucide-react';
import { Message } from '../types';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { theme } = useTheme();
  const isUser = message.role === 'user';

  return (
    <div className={clsx(
      'flex items-start gap-4 p-4 rounded-lg animate-fade-in',
      isUser 
        ? 'bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-sm' 
        : theme === 'light' 
          ? 'bg-white/80 backdrop-blur-sm border border-gray-100' 
          : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700'
    )}>
      <div className={clsx(
        'w-8 h-8 rounded-full flex items-center justify-center',
        isUser 
          ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
          : 'bg-gradient-to-r from-green-500 to-emerald-500'
      )}>
        {isUser ? (
          <MessageCircle className="w-5 h-5 text-white" />
        ) : (
          <Brain className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-200 dark:text-gray-100 neon-text">
          {isUser ? 'You' : 'AI Chef Assistant'}
        </p>
        <p className="mt-1 text-gray-300 dark:text-gray-300">{message.content}</p>
      </div>
    </div>
  );
};