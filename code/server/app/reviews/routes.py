# Author: @Roshni, @Anshul

from flask import jsonify, request
from flask_jwt_extended import jwt_required
import pandas as pd
from . import reviews_bp
from ..models import Restaurant, db, Review

@reviews_bp.route('/', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([{
        "review_id": review.review_id,
        "restaurant_id": review.restaurant_id,
        "rating": float(review.rating) if review.rating else None,
        "review_text": review.review_text
    } for review in reviews])
    
@reviews_bp.route('/restaurant/<int:restaurant_id>', methods=['GET'])
def get_reviews_of_restaurant(restaurant_id):
    
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404
    
    reviews = Review.query.filter_by(restaurant_id=restaurant_id).all()
    
    return jsonify([{
        "review_id": review.review_id,
        "restaurant_id": review.restaurant_id,
        "rating": float(review.rating) if review.rating else None,
        "review_text": review.review_text
    } for review in reviews])
    

@reviews_bp.route('/details/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get_or_404(review_id)
    return jsonify({
        "review_id": review.review_id,
        "restaurant_id": review.restaurant_id,
        "rating": float(review.rating),
        "review_text": review.review_text,
    })