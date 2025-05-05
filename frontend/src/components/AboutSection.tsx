
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import mainImg from '../assets/furia_imagem_principal.jpeg'

type AboutSectionProps = {
  onOpenChat: () => void;
};

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenChat }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen flex items-center py-20"
    >
      <div className="container mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="space-y-6 text-lg">
            <h2 className="text-4xl md:text-5xl font-bold">Sobre nosso <span className="text-primary">Chatbot</span></h2>
            <p className="text-lg text-gray-700">
            Lançado para aproximar ainda mais os fãs da FURIA do seu time do coração, o FURIA FanChat é um assistente interativo criado especialmente para torcedores apaixonados por e-sports.
            </p>
            <p className="text-lg text-gray-700">
            Com ele, você pode:
            </p>
            <ul>
              <li>🔴 Acompanhar partidas ao vivo</li>
              <li>👥 Conhecer o elenco atual</li>
              <li>📅 Ver a agenda de jogos</li>
              <li>📜 Navegar pelo histórico de partidas e torneios</li>
            </ul>
            <p className="text-lg text-gray-700">
            Tudo isso em um ambiente rápido, acessível e com a cara da FURIA.
            </p>
            <p>
            Nosso objetivo é transformar a experiência do fã em algo dinâmico e imersivo — direto do chat, sem complicações.
            </p>
            <Button 
              onClick={onOpenChat}
              className="mt-4"
              size="lg"
            >
              Converse agora mesmo!
            </Button>
          </div>
          
          <div className={`bg-gray-800 h-32 md:h-60 rounded-lg overflow-hidden shadow-lg ${isVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
            {/* This would be an image in a real implementation */}
            <div className="w-full h-full bg-gradient-to-br from-primary to-black flex items-center justify-center">
              <img src={mainImg} alt="future_is_black" className='className="w-full h-full object-cover"'/>
              {/* <span className="text-white text-3xl md:text-5xl font-bold">FURIA</span> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
