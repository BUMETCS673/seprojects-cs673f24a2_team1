from flask import Blueprint, request, jsonify
# from .models import db, Restaurant, Review

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def get_restaurants():
    # restaurants = Restaurant.query.all()
    # restaurant_list = [{'id': r.id, 'name': r.name, 'cuisine': r.cuisine, 'rating': r.rating} for r in restaurants]
    return "Hello from backend"

@main.route('/restaurants', methods=['GET'])
def get_restaurants():
    # restaurants = Restaurant.query.all()
    # restaurant_list = [{'id': r.id, 'name': r.name, 'cuisine': r.cuisine, 'rating': r.rating} for r in restaurants]
    return "Hello from backend | Restaurants"

# @main.route('/restaurant/<int:restaurant_id>/reviews', methods=['POST'])
# def add_review(restaurant_id):
#     data = request.json
#     new_review = Review(
#         restaurant_id=restaurant_id,
#         user_id=data['user_id'],
#         review_text=data['review_text'],
#         rating=data['rating']
#     )
#     db.session.add(new_review)
#     db.session.commit()
#     return jsonify({'message': 'Review added successfully!'}), 201
