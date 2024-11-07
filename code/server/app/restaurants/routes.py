from flask import jsonify, request
from . import restaurants_bp
from ..models import db, Restaurant

@restaurants_bp.route('/', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([{
        "restaurant_id": restaurant.restaurant_id,
        "name": restaurant.name,
        "address": restaurant.address,
        "phone": restaurant.phone,
        "cuisine_type": restaurant.cuisine_type,
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None
    } for restaurant in restaurants])