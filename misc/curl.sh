ID='43057'
OBSERVER_LAT='48.8731039'
OBSERVER_LNG='2.3128007'
OBSERVER_ALT='87'
SECONDS='2'
API_KEY='BTZ4Q9-5TVAT8-MLJ997-4L7X'

# get satellite position for a given id
curl "https://api.n2yo.com/rest/v1/satellite/positions/${ID}/${OBSERVER_LAT}/${OBSERVER_LNG}/${OBSERVER_ALT}/${SECONDS}/&apiKey=${API_KEY}"
