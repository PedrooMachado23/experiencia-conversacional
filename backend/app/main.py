from fastapi import FastAPI
from scrapping.matches import get_match_hist
from scrapping.classifications import get_classification_hist
from scrapping.players import get_players

app = FastAPI()

@app.get('/matches')
def read_matches():
    return get_match_hist()

@app.get('/classifications')
def read_classifications():
    return get_classification_hist()

@app.get('/players')
def read_players():
    return get_players()