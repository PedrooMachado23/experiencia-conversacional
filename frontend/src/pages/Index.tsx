
import { useState } from 'react';
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import HistorySection from '@/components/HistorySection';
import CreditsSection from '@/components/CreditsSection';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 h-screen bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Bem vindo ao <span className="text-primary">FURIA FanChat</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Nosso chatbot especial para que você, nosso fã dedicado e amado, fique sabendo de tudo sobre a história da FURIA com CS!
            </p>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </section>
      
      <AboutSection onOpenChat={handleOpenChat} />
      <HistorySection />
      <CreditsSection />
      
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default Index;
