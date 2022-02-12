import csv
import requests

reader = csv.reader(open('events.csv'), skipinitialspace=True, delimiter=";")
url = "http://localhost/api/events"

for r in reader: 
    '''''
    print("date", r[0]);
    print("name", r[1]);
    print("country_name", r[2]);
    print("coordinates", r[3]);
    print("description", r[4]);
    '''
    payload = {
        'date' : r[0],
        'name' : r[1],
        'country_name' : r[2],
        'coordinates': r[3],
        'description' : r[4]
    }
    response = requests.request("POST", url, headers={}, data=payload)
    print(response.text)




