
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-between px-6 md:px-12',
        scrolled ? 'bg-black/90 py-3 shadow-lg' : 'bg-black py-5'
      )}
    >
      <div className="flex items-center">
        <div className="text-primary font-bold text-2xl">
          FURIA
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => scrollTo('about')} 
          className="text-white hover:text-primary transition-colors"
        >
          About
        </button>
        <button 
          onClick={() => scrollTo('history')} 
          className="text-white hover:text-primary transition-colors"
        >
          History
        </button>
        <button 
          onClick={() => scrollTo('credits')} 
          className="text-white hover:text-primary transition-colors"
        >
          Credits
        </button>
      </nav>

      <div className="md:hidden">
        {/* Mobile menu could be added here if needed */}
      </div>
    </header>
  );
};

export default Header;
