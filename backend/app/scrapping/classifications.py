import cloudscraper
from bs4 import BeautifulSoup
#TODO:
    #

def get_classification_hist():
    tournaments = []

    url = f'https://liquipedia.net/counterstrike/FURIA/Results'

    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    #lista para poder usar os campos como keys no dict
    tournament_fields = 'data, classificação, tier, tipo, imagem1, imagem2, torneio, placar, oponente, premio'.split(', ')
    tr_tags = soup.find('tbody').find_all('tr')
    for tr in tr_tags:
        tournament_data = {}

        tr_class = tr.get('class') #estes itens sao apenas headers para separar por ano
        if tr_class and 'sortbottom' in tr_class:
            continue
            
        td_tags = tr.find_all('td')
        for field, td in zip(tournament_fields, td_tags):
            #campos indesejados
            if field in 'tier, tipo, imagem1, imagem2, premio'.split(', '):
                continue

            value = ''.join(td.stripped_strings).replace('\xa0', '')

            #formatacao de dados especifica para cada campo
            if field == 'data':
                year, month, day = value.split('-')
                value = [f'{day}-{month}', year]
            elif field ==  'classificação':
                for string in 'st, nd, rd, th'.split(', '):
                    if string in value:
                        value = value.replace(string, '°')
            elif field == 'oponente':
                #algumas entradas desse campo em especifico nao tem imagem
                try:
                    image_tag = td.find('span').find('span').find('a')
                    value = image_tag['title']
                except:
                    pass      
            tournament_data[field] = value
        if tournament_data: tournaments.append(tournament_data)
    return tournaments

if __name__ == '__main__':
    print(get_classification_hist())