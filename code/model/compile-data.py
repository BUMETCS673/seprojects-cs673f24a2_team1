import requests
import pandas as pd


reviews_1 = pd.read_csv("reviews-1.csv")
reviews_2 = pd.read_csv("reviews-2.csv")
reviews_3 = pd.read_csv("reviews-3.csv")
reviews_4 = pd.read_csv("reviews-4.csv")
reviews_5 = pd.read_csv("reviews-5.csv")

reviews = pd.concat([reviews_1, reviews_2, reviews_3, reviews_4, reviews_5]).drop_duplicates(subset='review_id').reset_index(drop=True)

unique_place_ids = reviews['place_id'].unique()

restaurants = pd.DataFrame(columns=[
    'place_id', 'name', 'price_level', 'types', 'address', 
    'phone_number', 'opening_hours', 'photos', 'user_ratings_total', 'google_url', 'rating', 'vegan_rating', 'gf_rating', 'veg_rating'
])

API_KEY = 'AIzaSyCLyIS3AOvylY8MUExSSFUNfruG4f6I1vQ'  # Replace with your actual API key

# Function to fetch details from Google Places API
def fetch_place_details(place_id):
    url = f'https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={API_KEY}'
    response = requests.get(url)
    place_details = response.json()
    
    if place_details['status'] == 'OK':
        result = place_details['result']
        place_info = {
            'place_id': place_id,
            'name': result.get('name', ''),
            'price_level': result.get('price_level', ''),
            'rating': result.get('rating', ''),
            'types': ', '.join(result.get('types', [])),
            'address': result.get('formatted_address', ''),
            'phone_number': result.get('formatted_phone_number', ''),
            'opening_hours': result.get('opening_hours', {}).get('periods', []),
            'photos': result.get('photos', []),
            'user_ratings_total': result.get('user_ratings_total', ''),
            'google_url': result.get('url', ''),
            'vegan_rating': None,
            'gf_rating': None,
            'veg_rating': None
        }
        return place_info
    else:
        return None
    
restaurants_data = []

for place_id in unique_place_ids:
    place_details = fetch_place_details(place_id)
    if place_details:
        restaurants_data.append(place_details)

restaurants_df = pd.DataFrame(restaurants_data)

restaurants_df.to_csv('restaurants.csv')
reviews.to_csv('reviews.csv')