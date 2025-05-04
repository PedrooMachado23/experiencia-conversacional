
import { useRef, useState, useEffect } from 'react';

const historyData = [
  { year: 2017, event: "FURIA Esports founded", description: "Organization established in Brazil" },
  { year: 2018, event: "First CS:GO team formed", description: "Initial roster announced" },
  { year: 2019, event: "International breakthrough", description: "First major tournament qualification" },
  { year: 2020, event: "Expansion to new titles", description: "Added VALORANT and Rainbow Six teams" },
  { year: 2021, event: "Training facility opened", description: "State-of-the-art complex in São Paulo" },
  { year: 2022, event: "Major sponsorship deals", description: "Partnerships with global brands" },
  { year: 2023, event: "First international championship", description: "Victory at major esports event" },
  { year: 2024, event: "Global expansion", description: "New teams and facilities worldwide" }
];

const HistorySection = () => {
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
      id="history" 
      ref={sectionRef}
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-center mb-12">Sobre os <span className="text-primary">Dados Coletados</span></h2>
          
          <div className="w-full overflow-x-auto rounded-lg shadow p-5 bg-white text-lg">
            <div className="space-y-3">
              <p>
                Nosso chatbot foi desenvolvido para oferecer informações atualizadas e confiáveis sobre a FURIA — e pra isso, buscamos dados direto das melhores fontes do cenário competitivo:
              </p>
              <ul className="list-disc ml-5">
                <li>HLTV.org: Referência mundial em CS2, é de lá que puxamos as partidas ao vivo e os confrontos que ainda estão por vir.</li>
                <li>Liquipedia.net: Nossa enciclopédia gamer favorita! De lá vem os dados sobre histórico de partidas, classificações em torneios e o lineup atual da FURIA.</li>
              </ul>
              <p>
                Essas informações são processadas em tempo real por nosso backend em FastAPI, que se conecta diretamente a essas fontes por meio de web scraping.
              </p>
              <p>
                Tudo isso pra garantir que você tenha acesso à caçada mais atualizada possível. 🐾
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
