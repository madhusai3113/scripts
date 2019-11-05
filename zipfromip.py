import re
import json
from urllib2 import urlopen


fr = open("zipValues.csv","r")
fw = open("zipEmailMappingPython.csv",'a+')

def getZipfromIp(IP):
    if IP:
        try:
            url = "https://ipinfo.io/"+str(IP)+"/json?token=0798d58384fa19"
            url = url.replace('\n','')
            response = urlopen(url)
            data = json.load(response)
            if "postal" in data:
                return data['postal']
        except:
            pass
    return ""
def getZipfromIpA(IP):
    if IP:
        url = "https://ipinfo.io/"+str(IP)+"/json"
        url = url.replace('\n','')
        response = urlopen(url)
        data = json.load(response)
        if "postal" in data:
            return data['postal']
    return ""

i=0
for line in fr:
    if i>0:
        line = line.split(",")
        email = line[2]
        ip = line[5].strip()
        zip = getZipfromIp(ip)
        print email,zip
        fw.write(email+","+zip)
        fw.write("\n")
    i=i+1