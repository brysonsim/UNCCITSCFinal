import requests
import json


def get_loc():
    ip = requests.get('https://api.ipify.org').content.decode('utf8')
    loc = json.loads(requests.get("http://ipwhois.app/json/" + ip).content)
    loc_long = loc["longitude"]
    loc_lat = loc["latitude"]
    return (float(loc_long),float(loc_lat))