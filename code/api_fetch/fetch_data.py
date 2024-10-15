import requests
import time

def fetch_restaurants(api_key, dietary_restriction):
    """
    Fetch restaurants from Google Places API based on dietary restrictions.
    :param api_key: Your Google API key
    :param dietary_restriction: Type of dietary restriction to filter (e.g., 'vegan', 'gluten-free')
    :return: List of restaurants with details
    """
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    query = f"{dietary_restriction} restaurants in Boston"
    all_restaurants = []

    # Pagination loop to fetch more results if available
    next_page_token = None

    while True:
        params = {
            "query": query,
            "key": api_key
        }
        if next_page_token:
            params['pagetoken'] = next_page_token
        
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            if 'results' in data:
                all_restaurants.extend(data['results'])

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

    return all_restaurants


def fetch_reviews(api_key, place_id):
    """
    Fetch reviews and additional details for a specific restaurant using Google Places Details API.
    :param api_key: Your Google API key
    :param place_id: Place ID of the restaurant
    :return: Dictionary containing restaurant details and reviews
    """
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "fields": "name,rating,formatted_address,reviews,opening_hours,price_level,photos",
        "key": api_key
    }

    response = requests.get(url, params=params)
    restaurant_details = {}
    reviews = []

    if response.status_code == 200:
        data = response.json()
        if 'result' in data:
            restaurant_details = data['result']
            reviews = restaurant_details.get('reviews', [])
        else:
            print(f"No detailed data found for Place ID: {place_id}")
    else:
        print(f"Error fetching restaurant details: {response.status_code} - {response.text}")

    return restaurant_details, reviews


if __name__ == "__main__":
    api_key = "AIzaSyCLyIS3AOvylY8MUExSSFUNfruG4f6I1vQ"  # For now included directly before we merge it i need to secure the API
    dietary_restrictions = ["vegan", "gluten-free", "vegetarian", "halal", "kosher"]

    for restriction in dietary_restrictions:
        print(f"Fetching {restriction} restaurants in Boston...")
        restaurants = fetch_restaurants(api_key, restriction)

        for restaurant in restaurants:
            name = restaurant.get("name")
            address = restaurant.get("formatted_address")
            rating = restaurant.get("rating")
            place_id = restaurant.get("place_id")

            print(f"Restaurant: {name}, Address: {address}, Rating: {rating}")

            restaurant_details, reviews = fetch_reviews(api_key, place_id)
            if restaurant_details:
                opening_hours = restaurant_details.get("opening_hours", {}).get("weekday_text", "N/A")
                price_level = restaurant_details.get("price_level", "N/A")
                print(f"Opening Hours: {opening_hours}, Price Level: {price_level}")

            for review in reviews:
                author = review.get("author_name")
                text = review.get("text")
                print(f"Review by {author}: {text}")

        print(f"Completed fetching for {restriction} restaurants.\n")
