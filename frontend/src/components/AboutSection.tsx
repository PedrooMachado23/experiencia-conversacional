
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">About <span className="text-primary">FURIA</span></h2>
            <p className="text-lg text-gray-700">
              Founded in 2017, FURIA is one of Brazil's premier esports organizations, competing at the highest level across multiple games including CS:GO, Rainbow Six: Siege, VALORANT, and more.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to elevate Brazilian esports to international prominence while fostering a community of passionate gamers and fans.
            </p>
            <p className="text-lg text-gray-700">
              With state-of-the-art training facilities and a focus on player development, FURIA has quickly become a powerhouse in global esports competitions.
            </p>
            <Button 
              onClick={onOpenChat}
              className="mt-4"
              size="lg"
            >
              Chat with us
            </Button>
          </div>
          
          <div className={`bg-gray-800 h-72 md:h-96 rounded-lg overflow-hidden shadow-lg ${isVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
            {/* This would be an image in a real implementation */}
            <div className="w-full h-full bg-gradient-to-br from-primary to-black flex items-center justify-center">
              <span className="text-white text-3xl md:text-5xl font-bold">FURIA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
