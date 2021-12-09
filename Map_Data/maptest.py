# -*- coding: utf-8 -*-
"""
Created on Mon Nov 22 14:41:56 2021

@author: KATTE
"""
import plotly.express as px
import pandas as pd
import geoloc
from tqdm import tqdm
atlantic_weather = pd.read_csv("atlantic.csv",parse_dates=[2])

#Cat 1 = 74-95 MPH
#Cat 2 = 96-110 MPH
#Cat 3 = 111-130 MPH
#Cat 4 = 131-155 MPH
#Cat 5 = 155+
def clean_data(df):
    cat_list = []
    for i,lat in enumerate(df["Latitude"]):
        cat = 0
        df["Date"] = df["Date"]
        lat_neg = 1
        long_neg = 1
        long = atlantic_weather["Longitude"][i]
        if "S" in lat:
            lat_neg = -1
        if "W" in long:
            long_neg = -1
        lat = lat.replace("W","")
        lat = lat.replace("N","")
        lat = lat.replace("E","")
        lat = lat.replace("S","")
        long = long.replace("N","")
        long = long.replace("W","")
        long = long.replace("S","")
        long = long.replace("E","")
        df["Latitude"][i] = float(lat) * lat_neg
        df["Longitude"][i] = float(long) * long_neg
        if df["Maximum Wind"][i] < 0:
            df["Maximum Wind"][i] = 0
        if df["Maximum Wind"][i] < 95:
            cat = 1
        elif df["Maximum Wind"][i] < 110:
            cat = 2
        elif df["Maximum Wind"][i] < 131:
            cat = 3
        elif df["Maximum Wind"][i] < 155:
            cat = 4
        else:
            cat = 5
        cat_list.append(cat)
        if df["Minimum Pressure"][i] < 0:
            df["Minimum Pressure"][i] = 1013
    df["Category"] = cat_list

def filter_wind(df,min_speed):
    for i, wind in tqdm(enumerate(df["Maximum Wind"])):
        if wind < min_speed:
            df.drop(i, inplace=True)

def filter_landfall(df):
    hit_land = []
    for i, event in enumerate(df["Event"]):
        if str(event).strip() in ["HU","L"]:
            hit_land.append(df.iloc[i]["ID"])
    for i, st_id in enumerate(df["ID"]):
        if st_id not in hit_land:
            df.drop(i, inplace=True)

    
def filter_event(df, e = "L"):
    for i, event in enumerate(df["Event"]):
        if str(event).strip() == "L":
            1==1
        else:
            df.drop(i, inplace=True)

def filter_events(df, e = ["L"]):
    for i, event in enumerate(df["Event"]):
        if str(event).strip() in e:
            1==1
        else:
            df.drop(i, inplace=True)
def filter_name(df,name):
    df = df[df["Name"].strip == name]
    return df

def filter_speed_v2(df,speed):
    df = df[df["Maximum Wind"] > speed]
    return df
location = geoloc.get_loc()
print(location)
loc_dict = {"Latitude":location[1],"Longitude":location[0],"Name":"You are here"}
#clean_data(atlantic_weather)
#atlantic_weather.to_csv("atlantic_clean.csv")
atlantic_weather = pd.read_csv("atlantic_clean.csv",parse_dates=[2])
#filter_wind(atlantic_weather,155)
atlantic_weather = atlantic_weather.append(loc_dict,ignore_index=True)
#filter_name(atlantic_weather,"FAY")
#filter_events(atlantic_weather,["HU","L"])
#filter_landfall(atlantic_weather)
atlantic_weather = filter_speed_v2(atlantic_weather,155)


fig = px.scatter_mapbox(atlantic_weather, lat="Latitude", lon="Longitude", hover_name="Name", hover_data=["Date","Maximum Wind"],color = "Maximum Wind", zoom=3, width=800, height=600, opacity=.5)
fig.update_layout(mapbox_style="open-street-map")
fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})
f = fig.to_html(full_html=False)
fig.write_html("map.html")
fig.show()