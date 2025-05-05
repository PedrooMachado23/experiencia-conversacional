# 🦍 FURIA Web Chatbot

Um chatbot interativo que entrega, direto no navegador, informações em tempo real sobre o time de CS2 FURIA — os fãs vão ficar por dentro de tudo: lineup, histórico de partidas e torneios, partidas ao vivo e mais!. Tudo com scraping automatizado e uma interface web moderna.

---

## 📌 Visão Geral

Este projeto combina tecnologias de ponta para desenvolver um assistente web leve, responsivo e informativo focado no time FURIA. Ele consome dados dinamicamente das principais plataformas da cena competitiva de CS — HLTV e Liquipedia — e os exibe por meio de um chatbot de navegação simples e fluida.

---

## 🎯 Objetivo

Desenvolver um chatbot acessível via navegador que funcione como uma central de informações atualizadas sobre a equipe FURIA, com ênfase em:

- Partidas ao vivo e próximas
- Escalação atual
- Histórico recente de confrontos
- Classificação em campeonatos
- Links diretos para VODs ou partidas no HLTV

---

## 🛠️ Tecnologias e Dependências

### Frontend (`/frontend`)

- **React + TypeScript** – estrutura do app
- **TailwindCSS** – estilização moderna e responsiva
- **Framer Motion** – animações suaves e contextuais
- **Lucide React** – biblioteca de ícones moderna
- **fetch/axios** – comunicação com a API backend

### Backend (`/backend`)

- **FastAPI** – criação de endpoints rápidos e robustos
- **Uvicorn** – servidor ASGI leve para desenvolvimento
- **Cloudscraper** – permite scraping de sites protegidos com Cloudflare
- **BeautifulSoup4** – parse HTML flexível e robusto
- **requests** – requisições HTTP

---

## 🔌 Endpoints da API

- [Coleção Postman:](https://www.postman.com/zaynerorved/furia-experincia-conversacional/request/ce3flq3/get-requests?action=share&creator=39359442&ctx=documentation) Conjunto de requisições para todos os Endpoints

| Método | Rota                  | Descrição                                    |
|--------|------------------------|----------------------------------------------|
| GET    | `/players`             | Retorna o lineup atual da FURIA (Liquipedia) |
| GET    | `/matches`             | Histórico de partidas (Liquipedia)           |
| GET    | `/matches-live`        | Partidas ao vivo (HLTV)                      |
| GET    | `/matches-upcoming`    | Próximas partidas da FURIA (HLTV)            |
| GET    | `/classifications`     | Classificação da FURIA em torneios (Liquipedia) |

---

## ▶️ Como Rodar o Projeto

### Requisitos
- Node.js (v18+)
- Python 3.10+

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
### 2. Frontend
```bash
cd frontend
npm install
npm run build
npm run preview
```
### 🔗 Fonte dos Dados
- [HLTV.org](https://www.hltv.org/)
- [Liquipedia](https://liquipedia.net/counterstrike/Main_Page)
