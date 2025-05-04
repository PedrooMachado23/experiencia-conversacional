
import React from 'react';
import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
}

type ChatMessageProps = {
  message: string;
  isBot: boolean;
  options?: Option[];
  onOptionClick?: (label: string, value: string) => void; //handleSendMessage do Chatbot.tsx
  isTyping?: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isBot, 
  options = [],
  onOptionClick,
  isTyping = false
}) => {
  return (
    <div className={cn(
      "flex w-full mb-3",
      isBot ? "justify-start" : "justify-end"
    )}>
      {isBot && (
        <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 mr-2 overflow-hidden flex items-center justify-center">
          <img src="../public/furia_icon.jpeg" alt="" className='rounded-full'/>
        </div>
      )}

      <div className={cn(
        "max-w-[80%]",
      )}>
        {isTyping ? (
          <div className={cn(
            "rounded-lg py-2 px-4 inline-block",
            "bg-gray-200 text-gray-800"
          )}>
            <div className="chat-dots flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-gray-500"></span>
              <span className="inline-block h-2 w-2 rounded-full bg-gray-500"></span>
              <span className="inline-block h-2 w-2 rounded-full bg-gray-500"></span>
            </div>
          </div>
        ) : (
          <>
            <div className={cn(
              "rounded-lg py-2 px-4 inline-block",
              isBot ? "bg-gray-200 text-gray-800" : "bg-primary text-white"
            )}>
              {message.includes("<br>") ? (
                <div dangerouslySetInnerHTML={{ __html: message }} />
              ) : (
                <pre className="whitespace-pre-wrap tracking-tight">{message}</pre>
              )}
            </div>

            {isBot && options.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => onOptionClick && onOptionClick(option.label, option.value)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors whitespace-pre-wrap tracking-tight"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
