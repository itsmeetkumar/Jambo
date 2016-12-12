from bs4 import BeautifulSoup
import urllib2
import json

def call(category, city):
	# music, business, sports, meetups, workshops, festivals, exhibitions, fashion
	url = ''
		
	if category == 'no':
		url = 'http://allevents.in/' + city + '/all'
	else:
		url = 'http://allevents.in/' + city + '/' + category

	req = urllib2.urlopen(url).read()
	soup = BeautifulSoup(req, 'html.parser')
	events = soup.find_all('div', {'class': 'event-item'})

	FINAL_JSON = {'data': []}

	how_many = 0
	if len(events) >= 10:
		how_many = 10
	else:
		how_many = len(events)

	for each in range(how_many):
		TEMP = {}
		TEMP['photo'] = (events[each]).img['src']
		TEMP['title'] = (events[each]).h3.text
		TEMP['date'] = (events[each]).find_all('span', {'class': 'time'})[0].text
		TEMP['address'] = (events[each]).p.text.replace("\t", "").replace("\n", "")

		FINAL_JSON['data'].append(TEMP)

	return json.dumps(FINAL_JSON)