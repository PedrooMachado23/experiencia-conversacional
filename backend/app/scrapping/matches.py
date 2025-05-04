import cloudscraper
from bs4 import BeautifulSoup

def get_match_hist():
    matches_data = []

    url = f'https://liquipedia.net/counterstrike/FURIA/Matches'

    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    tr_tags = soup.find('tbody').find_all('tr')[1:]

    #necessario colocar todas as colunas para que não haja incoerencias ao usar 'for field, td_tag in zip(...)'
    match_fields = 'data, tier, tipo, imagem1, imagem2, torneio, participante, placar, oponente, links'.split(', ')
    row_count = 0
    for tr in tr_tags:
        match_data = {
            #data
            #torneio
            #placar
            #oponent
            #links
        }
        td_tags = tr.find_all('td')
        

        for field, td in zip(match_fields, td_tags):
            
            #excluindo campos indesejados
            if field in 'tier, tipo, imagem1, imagem2, participante'.split(', '):
                continue

            if field == 'links':
                value = []
                
                try:
                    span_tags = td.find_all('span')

                    for span_tag in span_tags:
                        value.append(span_tag.find('a')['href'])
                except:
                    pass

            else:
                value = ''.join(td.stripped_strings).replace('\xa0', '') #caracter presente no field 'placar'

                if field == 'data':
                    #separando para poder filtrar jogos por ano no front
                    date_part = value.split(' - ')[0]

                    if date_part != '': #jogos sem data no site
                        month_translation = {
                            'Jan': '01',
                            'Feb': '02',
                            'Mar': '03',
                            'Apr': '04',
                            'May': '05',
                            'Jun': '06',
                            'Jul': '07',
                            'Aug': '08',
                            'Sep': '09',
                            'Oct': '10',
                            'Nov': '11',
                            'Dec': '12',
                        }

                        month_day, year = date_part.split(', ')
                        month, day = month_day.split(' ')

                        value = [f'{day}-{month_translation[month]}', year]
                    else:
                        value = [f'Data não definida', '-']
            
            match_data[field] = value

        matches_data.append(match_data)
        row_count += 1
    
    return matches_data

def get_upcoming_matches():
    matches = []

    url = f'https://www.hltv.org/team/8297/furia#tab-matchesBox'

    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    header = soup.find(string="Upcoming matches for FURIA")

    if header:
        parent_div = header.parent.parent
        table_tag = parent_div.find('table')

        thead_tags = table_tag.find_all('thead')
        tr_tags = table_tag.find('tbody').find_all('tr')
        match_fields = 'data, oponente, botaoPartida'.split(', ')
        for thead in thead_tags[1:]: #primeiro é o header da tabela, enquanto os demais são os nomes do torneio
            tournament_name = ''.join(thead.stripped_strings)

        
            for tr in tr_tags:
                td_tags = tr.find_all('td')
                
                match_data = {'torneio': tournament_name}
                for field, td in zip(match_fields, td_tags):
                    if field == 'botaoPartida':
                        continue
                    
                    value = ' '.join(td.stripped_strings).replace('\xa0', '') #caracter presente no field 'placar'

                    if value == '': #quando tem mais de um torneio na mesma tabela, a última linha tem um texto vazio
                        continue

                    if field == 'data':
                        value = value.replace('/',' - ')

                    match_data[field] = value
                matches.append(match_data)
    else:
        matches.append({
            'torneio': '-',
            'data': 'Nenhuma partida encontrada',
            'oponente': '-'
        })
    return matches      
    

def get_live_matches():
    matches = []

    url = f'https://www.hltv.org/matches'

    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    live_matches_container_tag = soup.find('div', class_='liveMatches')

    if live_matches_container_tag:
        match_container_tags = live_matches_container_tag.find_all('div', class_='match-wrapper')
        
        for match_container in match_container_tags:
            match_inner_container_tag = match_container.find('div').find('div')
            link_tag = match_inner_container_tag.find('a')

            link = 'https://www.hltv.org' + link_tag['href'] #pegando o link dessa forma, o protocolo nao é retirado da tag
            tournament_name = ":'".join(link_tag.stripped_strings)
            
            team_containers = match_inner_container_tag.find_all('div', class_='match-teamname')
            teams = []
            for container in team_containers:
                teams.append(container.string)

            match_data = {
                'links': [link], #para manter consistência com a tipagem de match no front
                'torneio': tournament_name,
                'oponente': ' x '.join(teams)
            }
            matches.append(match_data)
    else:
        match_data = {
            'link': '-',
            'torneio': 'Nenhum jogo ao vivo no momento!',
            'oponente': '-'
        }
    return matches

if __name__ == '__main__':
    data = get_live_matches()
    print(data)
