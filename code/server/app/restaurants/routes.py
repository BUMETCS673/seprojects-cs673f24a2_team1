# Author: @Roshni, @Prayushi
# Editor: @Anshul

from datetime import datetime
import os
from flask import jsonify, request
from . import restaurants_bp
from ..models import db, Restaurant
import pandas as pd

# Prayushi
@restaurants_bp.route('/get-restaurants', methods=['GET'])
def get_restaurants():
    limit = request.args.get('limit', 100, type=int)
    
    if limit is not None:
        restaurants = Restaurant.query.limit(limit).all()
    else:
        restaurants = Restaurant.query.all()
        
    return jsonify([{
        "restaurant_id": restaurant.restaurant_id,
        "name": restaurant.name,
        "address": restaurant.address,
        "phone": restaurant.phone,
        "price_level": restaurant.price_level,
        "photo_ref": restaurant.photo_ref,
        "google_url": restaurant.google_url,
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None,
        "vegan_rating": float(restaurant.vegan_rating) if restaurant.vegan_rating else None,
        "gluten_free_rating": float(restaurant.gluten_free_rating) if restaurant.gluten_free_rating else None,
        "vegetarian_rating": float(restaurant.vegetarian_rating) if restaurant.vegetarian_rating else None,
    } for restaurant in restaurants])

# @Roshni
@restaurants_bp.route('/top-restaurants', methods=['GET'])
def get_top_restaurants():
    # Define the number of top restaurants to return, default is 10
    top_limit = request.args.get('limit', 10, type=int)

    # Query the top rated restaurants ordered by overall_rating in descending order
    top_restaurants = Restaurant.query.order_by(Restaurant.overall_rating.desc()).limit(top_limit).all()
    return jsonify([{
        "restaurant_id": restaurant.restaurant_id,
        "name": restaurant.name,
        "address": restaurant.address,
        "phone": restaurant.phone,
        "price_level": restaurant.price_level,
        "photo_ref": restaurant.photo_ref,
        "google_url": restaurant.google_url,
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None,
        "vegan_rating": float(restaurant.vegan_rating) if restaurant.vegan_rating else None,
        "gluten_free_rating": float(restaurant.gluten_free_rating) if restaurant.gluten_free_rating else None,
        "vegetarian_rating": float(restaurant.vegetarian_rating) if restaurant.vegetarian_rating else None,
    } for restaurant in top_restaurants])


# @Prayushi
@restaurants_bp.route('/details/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    return jsonify({
        "restaurant_id": restaurant.restaurant_id,
        "name": restaurant.name,
        "address": restaurant.address,
        "phone": restaurant.phone,
        "price_level": restaurant.price_level,
        "photo_ref": restaurant.photo_ref,
        "google_url": restaurant.google_url,
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None,
        "vegan_rating": float(restaurant.vegan_rating) if restaurant.vegan_rating else None,
        "gluten_free_rating": float(restaurant.gluten_free_rating) if restaurant.gluten_free_rating else None,
        "vegetarian_rating": float(restaurant.vegetarian_rating) if restaurant.vegetarian_rating else None,
    })
