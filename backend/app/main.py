from fastapi import FastAPI
from scrapping.matches import get_match_hist, get_upcoming_matches, get_live_matches
from scrapping.classifications import get_classification_hist
from scrapping.players import get_players
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#permite a comunicação do front com o back
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/matches')
def read_matches():
    return get_match_hist()

@app.get('/matches-upcoming')
def read_matches():
    return get_upcoming_matches()

@app.get('/matches-live')
def read_matches():
    return get_live_matches()

@app.get('/classifications')
def read_classifications():
    return get_classification_hist()

@app.get('/players')
def read_players():
    return get_players()