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


from flask import jsonify, request
from . import restaurants_bp
from ..models import db, Restaurant

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
        "cuisine_type": restaurant.cuisine_type,
        "overall_rating": float(restaurant.overall_rating) if restaurant.overall_rating else None,
        "created_at": restaurant.created_at.strftime('%Y-%m-%d %H:%M:%S')
    } for restaurant in top_restaurants])
