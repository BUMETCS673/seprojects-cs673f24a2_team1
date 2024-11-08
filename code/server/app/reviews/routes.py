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

@reviews_bp.route('/details/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get_or_404(review_id)
    return jsonify({
        "review_id": review.review_id,
        "restaurant_id": review.restaurant_id,
        "rating": float(review.rating),
        "review_text": review.review_text,
    })
    
@reviews_bp.route('/load', methods=['GET'])
@jwt_required()
def load_reviews():
    reviews = pd.read_csv('./data-files/reviews.csv')
    for _, row in reviews.iterrows():
        restaurant = Restaurant.query.filter_by(place_id=row.get("place_id")).first()
        new_review = Review(
            restaurant_id = restaurant.restaurant_id,
            rating=row.get("rating"),
            review_text=row.get("review_text", ""),
        )
        db.session.add(new_review)
        
    db.session.commit()
    
    return jsonify({
        "STATUS": "SUCCESS",
        "Reviews Added": len(reviews),
    })
    
# Temporary route for testing
@reviews_bp.route('/clear-all')
@jwt_required()
def clear_all_reviews():
    num = Review.query.delete()
    db.session.commit()
    return jsonify({
        "STATUS": "SUCCESS",
        "Reviews Deleted": num,
    })