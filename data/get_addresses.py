import sys
import csv
import pandas as pd
import time
from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="dataviscourse2018")

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

unique_addresses = list(set(all_addresses))
addresses = unique_addresses[0:3000]    #rebeka
#addresses = unique_addresses[3000:6000] #archit
#addresses = unique_addresses[6000:]     #yash

inputframe = pd.read_csv('addressmaps.csv')
mapped_addresses = list(inputframe['address'])
        
with open('addressmaps.csv', 'a') as f:
    writer = csv.writer(f)
    i = len(mapped_addresses)
    for address in addresses:
        if address in mapped_addresses:
            continue
        i += 1
        if i%100 == 0:
            time.sleep(60)
        location = geolocator.geocode(address)
        if location == None:
            writer.writerow([address, 0, 0])
        else:
            writer.writerow([address, location.latitude, location.longitude])
        sys.stdout.write(f'\rCompleted {i} of {len(addresses)}. ({i / len(addresses) * 100:.2f}%)')