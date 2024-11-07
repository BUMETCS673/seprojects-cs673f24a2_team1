### Author: Vignesh S
### Editor Anshul R

import requests
import time
import json

LOCATIONS = ["42.350594819286684, -71.10543128952082", "42.35154122296952, -71.12108932360093", "42.34453919333259, -71.09993815465123",
             "42.34228414609675, -71.12127014658142", "42.34755549166389, -71.07566403555829"]
RADIUS=1000

def fetch_restaurants(api_key, type):
    """
    Fetch restaurants from Google Places API based on dietary restrictions.
    :param api_key: Your Google API key
    :return: List of restaurants with details
    """
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    restaurants = {}
    results = []

    for location in LOCATIONS:
        # Pagination loop to fetch more results if available
        next_page_token = None

        while True:
            params = {
                "location": location,
                "radius": RADIUS,
                "type": type,
                "key": api_key
            }
            if next_page_token:
                params['pagetoken'] = next_page_token
            
            response = requests.get(url, params=params)

            if response.status_code == 200:
                data = response.json()
                if 'results' in data:
                    
                    results.extend(data.get('results'))

                    # Check if there's a next page of results
                    next_page_token = data.get('next_page_token')
                    if not next_page_token:
                        break
                    
                    # API requires a short pause before using the next_page_token
                    time.sleep(2)
                else:
                    print("No more results found.")
                    break
            else:
                print(f"Error fetching data: {response.status_code} - {response.text}")
                break
        
    for result in results:
        place_id = result["place_id"]
        if place_id not in restaurants.keys():
            restaurants[place_id] = {}
            restaurants[place_id]["place_id"] = place_id
            restaurants[place_id]["name"] = result["name"]
            if "price_level" in result.keys():
                restaurants[place_id]["price_level"] = result["price_level"]
            else:
                restaurants[place_id]["price_level"] = -1
                
            if "rating" in result.keys():
                restaurants[place_id]["rating"] = result["rating"]
            else:
                restaurants[place_id]["rating"] = 0
                
            if "types" in result.keys():
                restaurants[place_id]["types"] = result["types"]
            else:
                restaurants[place_id]["types"] = []
        
    return restaurants


def fetch_details(api_key, restaurants):
    """
    Fetch reviews and additional details for a specific restaurant using Google Places Details API.
    :param api_key: Your Google API key
    :param place_id: Place ID of the restaurant
    :return: Dictionary containing restaurant details and reviews
    """
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    
    for place_id in restaurants.keys():
    
        params = {
            "place_id": place_id,
            "key": api_key
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            if 'result' in data:
                restaurant_details = data['result']
                if 'formatted_address' in restaurant_details.keys():
                    restaurants[place_id]['address'] = restaurant_details['formatted_address']
                else:
                    restaurants[place_id]['address'] = 'NA'
                    
                if 'international_phone_number' in restaurant_details.keys():
                    restaurants[place_id]['phone_number'] = restaurant_details['international_phone_number']
                elif 'formatted_phone_number' in restaurant_details.keys():
                    restaurants[place_id]['phone_number'] = restaurant_details['formatted_phone_number']
                else:
                    restaurants[place_id]['phone_number'] = 'NA'
                    
                if 'opening_hours' in restaurant_details.keys():
                    if 'periods' in restaurant_details['opening_hours'].keys():
                        restaurants[place_id]['opening_hours'] = restaurant_details['opening_hours']['periods']
                    else:
                        restaurants[place_id]['opening_hours'] = ['NA']
                else:
                    restaurants[place_id]['opening_hours'] = []
                    
                if 'photos' in restaurant_details.keys():
                    restaurants[place_id]['photos'] = restaurant_details['photos']
                else:
                    restaurants[place_id]['photos'] = []
                    
                if 'user_ratings_total' in restaurant_details.keys():
                    restaurants[place_id]['user_ratings_total'] = restaurant_details['user_ratings_total']
                else:
                    restaurants[place_id]['user_ratings_total'] = -1
                    
                if 'url' in restaurant_details.keys():
                    restaurants[place_id]['google_url'] = restaurant_details['url']
                else:
                    restaurants[place_id]['google_url'] = 'NA'
                    
                if 'reviews' in restaurant_details.keys():
                    restaurants[place_id]['reviews'] = restaurant_details['reviews']
                else:
                    restaurants[place_id]['reviews'] = []
                
            else:
                print(f"No detailed data found for Place ID: {place_id}")
        else:
            print(f"Error fetching restaurant details: {response.status_code} - {response.text}")

    return restaurants


if __name__ == "__main__":
    api_key = "AIzaSyCLyIS3AOvylY8MUExSSFUNfruG4f6I1vQ"  # For now included directly before we merge it i need to secure the API
    types = ['restaurant', 'cafe']

    # for restriction in dietary_restrictions:
    print(f"Fetching restaurants")
    
    restaurants = fetch_restaurants(api_key, "restaurant")
    restaurants = fetch_details(api_key, restaurants)
    
    print(f"No of restaurants found: {len(restaurants)}")
    
    with open("restaurants-data.json", "w") as outfile:
        json.dump(restaurants, outfile, indent=4)