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
    match_fields = 'data, tier, tipo, imagem1, imagem2, torneio, participante, placar, oponente, vod(s)'.split(', ')
    row_count = 0
    for tr in tr_tags:
        match_data = {}
        td_tags = tr.find_all('td')
        

        for field, td in zip(match_fields, td_tags):
            
            #excluindo campos indesejados
            if td in 'tier, tipo, imagem1, imagem2, participante'.split(', '):
                continue

            if field == 'vod(s)':
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
                        continue
            
            match_data[field] = value

        matches_data.append(match_data)
        row_count += 1
    
    return matches_data

def get_upcoming_matches():
    pass

if __name__ == '__main__':
    print(get_match_hist())