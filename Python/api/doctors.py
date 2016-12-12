from bs4 import BeautifulSoup
import urllib2
import json
#
def call(city,special):

	FINAL_JSON = {'data': []}

	url="http://www.justdial.com/" +city+ "/"+special+"-Hospitals/ct-1051749183"
	req = urllib2.Request(url, headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'})
	con = urllib2.urlopen(req)
	soup=BeautifulSoup(con, "html.parser")

	for link in soup.find_all('div',{'class':'col-md-12 col-xs-12 padding0'}):
		TEMP = {}
		TEMP['name'] = link.h4.text
		TEMP['phone'] = link.b.text
		TEMP['address'] = link.find('span', {'class':'mrehover'}).text.strip()
		
		FINAL_JSON['data'].append(TEMP)

	print FINAL_JSON

	return json.dumps(FINAL_JSON)

	


