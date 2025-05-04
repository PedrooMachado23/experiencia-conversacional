
import { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const CreditsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  //animacao do conteudo aparecendo
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
    <footer 
      id="credits" 
      ref={sectionRef}
      className="bg-black text-white py-16"
    >
      <div className="container mx-auto px-6">
        <div className={`space-y-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-primary">FURIA</span> Esports
              </h2>
              <p className="text-gray-400 max-w-md">
                Elevando o e-sport Brasileiro a nível mundial desde 2017.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className={`space-y-4 ${isVisible ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
                <h3 className="font-bold text-lg">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://github.com/PedrooMachado23" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                      <Github size={18} />
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/pedroohmachado?igsh=MTdpeTk3ZnIwYWFiYQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                      <Instagram size={18} />
                      <span>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/pedro-henrique-machado-martins-968855305/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                      <Linkedin size={18} />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Pedro Henrique Machado Martins.
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com/PedrooMachado23" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.instagram.com/pedroohmachado?igsh=MTdpeTk3ZnIwYWFiYQ==" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/pedro-henrique-machado-martins-968855305/"  target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CreditsSection;
