
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatMessage from './ChatMessage';

type Message = {
  text: string;
  isBot: boolean;
  options?: string[];
  id: number;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageCounter, setMessageCounter] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendBotMessage("Hi there! Welcome to FURIA e-sports chat support. How can I help you today?", [
        "Tell me about FURIA",
        "Show me your teams",
        "Tournament schedule"
      ]);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const addMessage = (text: string, isBot: boolean, options: string[] = []) => {
    setMessageCounter(prev => prev + 1);
    setMessages(prev => [...prev, {
      text,
      isBot,
      options,
      id: messageCounter
    }]);
  };

  const sendBotMessage = (text: string, options: string[] = []) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, true, options);
    }, 1500);
  };

  const handleSendMessage = (text: string) => {
    addMessage(text, false);
    
    // Simple response logic
    if (text.toLowerCase().includes("about furia")) {
      sendBotMessage("FURIA is a Brazilian esports organization founded in 2017. We compete in games like CS:GO, Rainbow Six, Fortnite, and more!", [
        "Tell me about CS:GO team",
        "Other teams?",
        "Upcoming events"
      ]);
    } else if (text.toLowerCase().includes("teams")) {
      sendBotMessage("We have top teams in CS:GO, Rainbow Six, Fortnite, PUBG, League of Legends, and VALORANT. Which one interests you?", [
        "CS:GO team",
        "Rainbow Six team",
        "VALORANT team"
      ]);
    } else if (text.toLowerCase().includes("schedule") || text.toLowerCase().includes("events")) {
      sendBotMessage("We have several upcoming tournaments! Our CS:GO team will be competing at IEM Cologne next month, and our Rainbow Six team has a major next week.", [
        "How to watch?",
        "Where to buy tickets",
        "Team roster"
      ]);
    } else if (text.toLowerCase().includes("cs:go")) {
      sendBotMessage("Our CS:GO team is one of the best in Brazil! The current lineup includes experienced players like KSCERATO and yuurih.", [
        "Recent results",
        "Next match",
        "Watch highlights"
      ]);
    } else {
      sendBotMessage("I'm not sure I understand. Could you try asking something else?", [
        "Tell me about FURIA",
        "Show me your teams",
        "Tournament schedule" 
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="rounded-full h-14 w-14 p-0 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-[350px] h-[500px] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-white mr-3 flex items-center justify-center text-primary font-bold text-sm">
                F
              </div>
              <span className="font-medium">FURIA Support</span>
            </div>
            <Button 
              onClick={() => setIsOpen(false)} 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-primary/80 h-8 w-8"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                options={message.options}
                onOptionClick={handleSendMessage}
              />
            ))}
            {isTyping && (
              <ChatMessage
                message=""
                isBot={true}
                isTyping={true}
              />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input - For a real implementation, you might want to add a proper input */}
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500 text-center">
              Click on suggested replies above or ask your question
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
