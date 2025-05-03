
import { useState } from 'react';
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import HistorySection from '@/components/HistorySection';
import CreditsSection from '@/components/CreditsSection';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 h-screen bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome to <span className="text-primary">FURIA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Brazil's premier esports organization competing at the highest level worldwide
            </p>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      <AboutSection onOpenChat={handleOpenChat} />
      <HistorySection />
      <CreditsSection />
      
      <Chatbot />
    </div>
  );
};

export default Index;
