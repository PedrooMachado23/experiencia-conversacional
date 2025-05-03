
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
          <h2 className="text-4xl font-bold text-center mb-12">Our <span className="text-primary">History</span></h2>
          
          <div className="w-full overflow-x-auto rounded-lg shadow">
            <table className="w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Year</th>
                  <th className="py-3 px-6 text-left">Event</th>
                  <th className="py-3 px-6 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b ${isVisible ? `animate-fade-in-up animate-delay-${Math.min(index * 100, 300)}` : 'opacity-0'} ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="py-4 px-6">{item.year}</td>
                    <td className="py-4 px-6 font-medium">{item.event}</td>
                    <td className="py-4 px-6">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
