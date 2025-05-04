
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, SendToBackIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatMessage from './ChatMessage';
import axios from 'axios';

type Option = {
  label: string;
  value: string;
}

type Message = {
  text: string;
  isBot: boolean;
  options?: Option[];
  id: number;
};

type Player = {
  nationality: string;
  nickname: string;
  name: string;
  role: string;
}

type Match = {
  data?: string[];
  torneio?: string;
  placar?: string;
  oponente?: string;
  links?: string[]
}

type Classification = {
  data: string[];
  classificacao: string;
  torneio: string;
  placar: string;
  oponente: string;
}

type ChatbotProps = {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
};

const Chatbot = ({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }: ChatbotProps) => {
  const [localIsOpen, localSetIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
  const setIsOpen = propSetIsOpen !== undefined ? propSetIsOpen : localSetIsOpen;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //informacoes do backend
  const [playersData, setPlayerData] = useState<Player[] | null>(null)
  const [matchHistData, setMatchHistData] = useState<Match[] | null>(null)
  const [liveMatchData, setLiveMatchData] = useState<Match[] | null>(null)
  const [upcomingMatchData, setUpcomingMatchData] = useState<Match[] | null>(null)
  const [classHistData, setClassHistData] = useState<Classification[] | null>(null)

  //scrolla para a ultima mensagem mandada
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  //retorna dados dos players da FURIA
  const getPlayerData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/players')
      setPlayerData(response.data)

      console.log('players:')
      console.log(response.data)
    } catch (error) {
      console.log('Erro no fetch de players: ', error.message)
    }
  }

  //retornar dados sobre partidas ao vivo
  const getLiveMatchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/matches-live')
      setLiveMatchData(response.data)

      console.log('liveMatches:')
      console.log(response.data)
    } catch (error) {
      console.log('Erro no fetch de liveMatches: ', error.message)
    }
  }

  //retorna dados sobre o historico de partida da FURIA
  const getMatchHistData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/matches')
      setMatchHistData(response.data)

      console.log('matchHist:')
      console.log(response.data)
    } catch (error) {
      console.log('Erro no fetch de matchHist: ', error.message)
    }
  }

  //retorna dados sobre as proximas partidas da FURIA
  const getUpcomingMatchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/matches-upcoming')
      setUpcomingMatchData(response.data)

      console.log('upcomingMatches:')
      console.log(response.data)
    } catch (error) {
      console.log('Erro no fetch de upcomingMatches: ', error.message)
    }
  }

  //retorna dados sobre o historico de classificacoes da FURIA
  const getClassHistData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/classifications')
      setClassHistData(response.data)

      console.log('classHist:')
      console.log(response.data)
    } catch (error) {
      console.log('Erro no fetch de classHist: ', error.message)
    }
  }

  //carrega os dados do backend
  useEffect(() => {
    getPlayerData()
    getLiveMatchData()
    getMatchHistData()
    getUpcomingMatchData()
    getClassHistData()
  }, [])

  //adiciona uma mensagem ao chat
  const addMessage = (text: string, isBot: boolean, options: Option[] = []) => {
    setMessages(prev => [...prev, {
      text,
      isBot,
      options,
      id: Date.now() + Math.random()
    }]);
  };

  //animacao 'digitando'
  const sendBotMessage = (text: string, options: Option[] = []) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, true, options);
    }, 1500);
  };

  //menu principal (reutilizacao de codigo)
  const showMainMenu = () => {
    sendBotMessage("O que você quer ver agora?", [
      { label: "🐾 Sobre a FURIA", value: 'about'},
      { label: "👥 Nosso time", value: 'team'},
      { label: "🎮 Nossas partidas", value: 'match'}
    ]);
  }

  //funcao para mandar mensagem de acordo com o value
  const handleSendMessage = (label: string, value: string) => {
    const returnMenu = {
      label: 'Menu Principal',
      value: 'mainContext'
    }

    if (label) {
      addMessage(label, false);
    }

    if (value === 'mainContext') {
      showMainMenu()
    }

    if (value === 'about') {
      sendBotMessage(
        `🐾 Fundada em 2017, a FURIA é uma das maiores organizações de e-sports do Brasil — e um dos times de CS mais temidos do mundo.
\nCom estilo agressivo, identidade forte e uma legião de fãs apaixonados, a FURIA representa o Brasil nos maiores torneios internacionais.
\nVem com a gente nessa caçada! 🎯`,
        [{label: 'FURIA ❣️', value: 'mainContext'}]
      )
    }
 
    if (value === 'match') {
      sendBotMessage(`🎮 Tá afim de acompanhar as batalhas da FURIA?
\nEscolhe aí o que você quer ver:`, [
        {label: '🎥 Partidas ao vivo', value: 'liveMatches'},
        {label: '📜 Histórico de partidas', value: 'matchHist'},
        {label: '📅 Próximas partidas', value: 'upcomingMatches'},
        returnMenu
      ])
    }

    if (value === 'liveMatches') {
      const furiaLiveMatches = liveMatchData.filter(mat => mat.oponente.toLowerCase().includes('furia'))
      
      let liveMatchesString = 'Bora assistir uma partida ? Se liga no que eu encontrei:'
      if (furiaLiveMatches.length > 0) {
        liveMatchesString += '<br><br>Partidas da gigante 😎:'

        furiaLiveMatches.forEach(item => {
          liveMatchesString += `<br>${item.torneio}. ${item.oponente}.<br><a href="${item.links[0]}" target="_blank" rel="noopener noreferrer">👉 Assista agora! 🎥</a>`
        })

        liveMatchesString += '<br><br>Outras partidas:'
      } else {
        liveMatchesString += '<br><br>A FURIA não está jogando agora 😭'
      }

      const tournaments = Array.from(
        new Set(liveMatchData.map(item => item.torneio))
      )

      tournaments.forEach(tour_name => {
        liveMatchesString += `<br><br>${tour_name}:`

        const filteredLiveMatchData = liveMatchData.filter(item => {
          const sameTour = item.torneio === tour_name
 
          const notFuriaMatch = !furiaLiveMatches.some(
            furiaMatch => furiaMatch.oponente === item.oponente && furiaMatch.torneio === item.torneio
          );

          return sameTour && notFuriaMatch
    
        })
        
        if (filteredLiveMatchData.length > 0){
          filteredLiveMatchData.forEach(item => {
            liveMatchesString += `<br>->${item.oponente}.<br><a href="${item.links[0]}" target="_blank" rel="noopener noreferrer">👉 Assista agora! 🎥</a>`
          })
        } else {
          liveMatchesString += ' Nenhuma partida disponível'
        }
        
      })

      sendBotMessage(liveMatchesString, [
        returnMenu
      ])
    }

    if (value === 'matchHist') {
      const years = Array.from(
        new Set(matchHistData.map(mat => mat.data[1]))
      )

      const years_options: Option[] = years.map(year => ({
        label: year,
        value: 'matchHistList'
      }))

      sendBotMessage('Claro! Escolha um ano ver todas as partidas que tivemos!', [...years_options, returnMenu])
    }

    if (value === 'matchHistList'){
      const filteredMatchHist = matchHistData.filter(mat => mat.data[1] === label)

      let matchHistString = `Encontrei ${filteredMatchHist.length} partidas! Dá uma olhada:`
      filteredMatchHist.forEach(item => {
        matchHistString += `<br><br>-> ${item.data[0]}: ${item.torneio}. FURIA ${item.placar} ${item.oponente}.<br>👉 Onde Assistir: `

        const vodsLinks = item.links
        if (vodsLinks.length > 0) {

          vodsLinks.forEach((link, i) => {
            matchHistString += `<br>-<a href="${link}" target="_blank" rel="noopener noreferrer">Link ${i+1} 🎮</a>` 
          })

        } else {
          matchHistString += '\nNenhum registro encontrado 🏳️'
        }
      })
      
      sendBotMessage(matchHistString, [
        {label: 'Ver outros partidas', value: 'matchHist'},
        returnMenu
      ])
    }

    if (value === 'upcomingMatches') {
      let botMessageString = 'Se liga em nossos próximos confrontos:'
      
      const tournaments = Array.from(
        new Set(upcomingMatchData.map(item => item.torneio))
      )

      tournaments.forEach(tour_name => {
        botMessageString += `\n\n${tour_name}:`

        const filteredUpcomingMatchData = upcomingMatchData.filter(item => item.torneio === tour_name)
        filteredUpcomingMatchData.forEach(upc_match => {
          botMessageString += `\n-> ${upc_match.data}. ${upc_match.oponente}`
        })
      })
      
      sendBotMessage(botMessageString,[
        {label: 'Pra cima! 🔥', value: 'mainContext'}
      ])
    }

    if (value === 'team') {
      sendBotMessage(`👥 Bora conhecer quem tá representando o manto?
\nVocê quer ver:`, [
        {label: '🔫 Lineup atual', value: 'lineup'},
        {label: '🏆 Histórico nos torneios', value: 'classHist'},
        returnMenu
      ])
    }

    if (value === 'lineup') {
      let players_string = 'Claro! Se liga na nossa line atual!'
      playersData.forEach(player => {
        players_string += `\n\n-> ${player.nickname}, ${player.name} ${player.role}. País de origem: ${player.nationality}`
      })

      sendBotMessage(players_string, [
        {label: 'GGWP! 😎', value: 'mainContext'}
      ]
      )
    }

    if (value === 'classHist') {
      const years = Array.from(
        new Set(classHistData.map(cl => cl.data[1]))
      )

      const years_options: Option[] = years.map(year => ({
        label: year,
        value: 'classHistList'
      }))

      sendBotMessage('Claro! Escolha um ano ver todos os torneios que participamos!', [...years_options, returnMenu])
    }

    if (value === 'classHistList'){
      const filteredClassHist = classHistData.filter(cl => cl.data[1] === label)

      let classHistString = `Encontrei ${filteredClassHist.length} torneios! Saca só:`
      filteredClassHist.forEach(item => {
        classHistString += `\n\n-> ${item.data[0]} ${item.torneio}. FURIA ${item.placar} ${item.oponente}\n👉 Resultado: ${item.classificacao}`
      })
      
      sendBotMessage(classHistString, [
        {label: 'Ver outros torneios', value: 'classHist'},
        returnMenu
      ])
    }
  };

  //mensagem inicial quando o chat primeiro abre
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendBotMessage(
        `👊 Salve, torcedor(a) da FURIA!\n
🔥 Seja bem-vindo ao canal oficial da torcida mais insana do CS!\n
Aqui você pode acompanhar tudo sobre o time, os jogos, e a nossa história.
Escolha uma opção pra começar 👇`,
        []
      )
      showMainMenu()
    }

    scrollToBottom();
  }, [isOpen]);

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
        <div className="bg-white rounded-lg shadow-lg w-[475px] h-[500px] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-white mr-3 flex items-center justify-center text-primary font-bold text-sm">
                <img src="../public/furia_icon.jpeg" alt="" className='rounded-full'/>
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
              Selecione o botão de seu interesse
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
