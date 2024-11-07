import re
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import pandas as pd

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

DIETARY_KEYWORDS = {
    "vegan": ["vegan", "plant-based"],
    "gluten_free": ["gluten-free", "no gluten"],
    "vegetarian": ["vegetarian", "meatless"],
}

def filter_reviews_by_diet(reviews, dietary_keywords):
    """Filter reviews that mention specific dietary keywords."""
    filtered_reviews = {diet: [] for diet in dietary_keywords}
    for review in reviews:
        review = str(review)
        for diet, keywords in dietary_keywords.items():
            if any(keyword.lower() in review.lower() for keyword in keywords):
                filtered_reviews[diet].append(review)
    return filtered_reviews

def analyze_sentiment(reviews):
    """Analyze the sentiment of reviews and return average score."""
    scores = []
    for review in reviews:
        review = str(review)
        sentiment_score = sia.polarity_scores(review)["compound"]
        scores.append(sentiment_score)
    # Average score over all reviews; map to a 5-star rating system
    avg_score = sum(scores) / len(scores) if scores else 0
    return (avg_score + 1) * 2.5  # Scale -1 to 1 sentiment to 1 to 5 rating

def generate_ratings_for_dietary_preferences(reviews):
    """Generate ratings for each dietary preference based on reviews."""
    filtered_reviews = filter_reviews_by_diet(reviews, DIETARY_KEYWORDS)
    ratings = {}
    for diet, diet_reviews in filtered_reviews.items():
        rating = analyze_sentiment(diet_reviews)
        ratings[diet] = rating
    return ratings

restaurants_df = pd.read_csv('restaurants.csv')
reviews_df = pd.read_csv('reviews.csv')

vegan_ratings = []
gf_ratings = []
veg_ratings = []

for index, row in restaurants_df.iterrows():
    place_id = row['place_id']
    reviews_list = list(reviews_df[reviews_df['place_id'] == place_id]['review_text'])
    diet_ratings = generate_ratings_for_dietary_preferences(reviews_list)
    vegan_ratings.append(round(float(diet_ratings['vegan']), 1))
    gf_ratings.append(round(float(diet_ratings['gluten_free']), 1))
    veg_ratings.append(round(float(diet_ratings['vegetarian']), 1))

restaurants_df['vegan_ratings'] = vegan_ratings
restaurants_df['gf_ratings'] = gf_ratings
restaurants_df['veg_ratings'] = veg_ratings
restaurants_df.to_csv('restaurants.csv')