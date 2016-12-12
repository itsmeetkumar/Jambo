from bs4 import BeautifulSoup
import urllib2
import json

def call(f, t):
	url = "http://www.mapdevelopers.com/distance_from_to.php?&from=" + f + "&to=" + t
	req = urllib2.urlopen(url).read()
	soup = BeautifulSoup(req, 'html.parser')

	# print soup.find_all('span', {'class': 'distancesone'})
	print soup.find_all('div', {'id': 'status'})

call('ranip', 'nikol')

