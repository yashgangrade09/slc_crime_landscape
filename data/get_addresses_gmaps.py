import googlemaps
import pandas as pd
import csv, time
from tqdm import tqdm
from datetime import datetime

gmaps = googlemaps.Client(key='AIzaSyBWvx44KN2oY6UdowQrNz2yhT9kS2xzqlc')

def get_latlong(address_string):
	# Geocoding an address
	geocode_result = gmaps.geocode(address_string)

	if geocode_result:
		# Extract the relevant field
		lat_long = geocode_result[0]['geometry']['location']
	else:
		lat_long = {'lat': 0.0, 'lng': 0.0}

	return lat_long['lat'], lat_long['lng']


frame2008 = pd.read_csv('2008.csv')
frame2009 = pd.read_csv('2009.csv')
frame2010 = pd.read_csv('2010.csv')
frame2011 = pd.read_csv('2011.csv')
frame2012 = pd.read_csv('2012.csv')
frame2013 = pd.read_csv('2013.csv')
frame2014 = pd.read_csv('2014.csv')
frame2015 = pd.read_csv('2015.csv')
frame2016 = pd.read_csv('2016.csv')

addresses = list(frame2008['LOCATION                                                                                            '])
addresses = addresses + list(frame2009['LOCATION'])
addresses = addresses + list(frame2010['LOCATION                                                                                            '])
addresses = addresses + list(frame2011['location                                                                                     '])
addresses = addresses + list(frame2012['LOCATION'])
addresses = addresses + list(frame2013['ADDRESS'])
addresses = addresses + list(frame2014['LOCATION'])
addresses = addresses + list(frame2015['location'])
addresses = addresses + list(frame2016['LOCATION                                                                                       '])

all_addresses = []

for add in addresses:
    if not isinstance(add, str):
        continue
    complete_add = add.strip() + ', Salt Lake City, Utah'
    all_addresses.append(complete_add)

addresses = sorted(list(set(all_addresses)))

inputframe = pd.read_csv('gmap_addresses.csv')
existing_addresses = set(inputframe['address'])

with open('gmap_addresses.csv', 'a') as f:
	writer = csv.writer(f)
	
	for address in tqdm(addresses):
		# If already found, skip
		if address in existing_addresses:
			continue

		time.sleep(0.200)

		latitude, longitude = get_latlong(address)
		writer.writerow([address, latitude, longitude])