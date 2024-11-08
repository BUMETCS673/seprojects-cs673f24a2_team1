# Author: @Roshni, @Prayushi
# Editor: @Anshul

from datetime import datetime
import os
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from . import restaurants_bp
from ..models import db, Restaurant
import pandas as pd

@restaurants_bp.route('/', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([{
        "restaurant_id": restaurant.restaurant_id,
        "name": restaurant.name,
        "address": restaurant.address,
        "phone": restaurant.phone,
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None,
        "vegan_rating": float(restaurant.vegan_rating) if restaurant.vegan_rating else None,
        "gluten_free_rating": float(restaurant.gluten_free_rating) if restaurant.gluten_free_rating else None,
        "vegetarian_rating": float(restaurant.vegetarian_rating) if restaurant.vegetarian_rating else None,
    } for restaurant in restaurants])

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
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None,
        "vegan_rating": float(restaurant.vegan_rating) if restaurant.vegan_rating else None,
        "gluten_free_rating": float(restaurant.gluten_free_rating) if restaurant.gluten_free_rating else None,
        "vegetarian_rating": float(restaurant.vegetarian_rating) if restaurant.vegetarian_rating else None,
    } for restaurant in top_restaurants])


@restaurants_bp.route('/details/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    return jsonify({
        "restaurant_id": restaurant.restaurant_id,
        "name": restaurant.name,
        "address": restaurant.address,
        "phone": restaurant.phone,
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None,
        "vegan_rating": float(restaurant.vegan_rating) if restaurant.vegan_rating else None,
        "gluten_free_rating": float(restaurant.gluten_free_rating) if restaurant.gluten_free_rating else None,
        "vegetarian_rating": float(restaurant.vegetarian_rating) if restaurant.vegetarian_rating else None,
    })
    
    
@restaurants_bp.route('/load')
@jwt_required()
def load_restaurants():
    restaurants = pd.read_csv('./data-files/restaurants.csv')
    for _, row in restaurants.iterrows():
        new_restaurant = Restaurant(
            place_id=row.get("place_id"),
            name=row.get("name"),
            address=row.get("address"),
            phone=row.get("phone_number"),
            overall_rating=row.get("rating"),
            vegan_rating=row.get("vegan_ratings"),
            gluten_free_rating=row.get("gf_ratings"),
            vegetarian_rating=row.get("veg_ratings"),
            created_at=datetime.utcnow()
        )
        db.session.add(new_restaurant)
    
    db.session.commit()
    
    return jsonify({
        "STATUS": "SUCCESS",
        "Restaurants Added": len(restaurants),
    })
    
# Temporary route for testing
@restaurants_bp.route('/clear-all')
@jwt_required()
def clear_all_restaurants():
    num = Restaurant.query.delete()
    db.session.commit()
    return jsonify({
        "STATUS": "SUCCESS",
        "Restaurants Deleted": num,
    })