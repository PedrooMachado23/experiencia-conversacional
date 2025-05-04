import cloudscraper
from bs4 import BeautifulSoup

#TODO:
    # pegar os links de cada player na hltv
    #fazer o get_player_stats

def get_players():
    players = []

    flag_translation = {
        'Brazil': 'Brasil',
        'Kazakhstan': 'Cazaquistão',
        'Latvia': 'Letônia'
    }

    url = 'https://liquipedia.net/counterstrike/FURIA'

    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    tr_tags = soup.find_all('tr', class_='Player')[:6] #pega apenas o roster ativo (e ha mencoes repetidas de players)

    for tr in tr_tags:
        try:
            #estrutura compartilhada entre flag_tag/id_tag
            commom_tag = tr.find('td', class_='ID').find('b').find('span').find('span')

            flag_tag = commom_tag.find('span').find('img')
            flag_name = flag_tag['alt'].strip()

            id_tag = commom_tag.find('a')
            player_id = id_tag.text.strip()

            name_tag = tr.find('td', class_="Name").find('div', class_='LargeStuff')
            player_name = name_tag.text.strip()

            position = '(Player)'
            #players com posicoes nao marcadas nao possuem a tag
            try:
                position_tag = tr.find('td', class_='Position').find('i')
                position = position_tag.text.strip()
            
            except:
                pass

            players.append({
                'nationality': flag_translation[flag_name],
                'nickname': player_id,
                'name': player_name,
                'role': position
            })

        except Exception as e:
            print('erro ao buscar tag: ' + e)
    return players

def get_player_stats():
    pass

if __name__ == '__main__':
    print(get_players())