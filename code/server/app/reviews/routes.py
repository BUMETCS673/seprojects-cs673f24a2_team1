from flask import jsonify, request
from . import reviews_bp
from ..models import db, Review

@reviews_bp.route('/', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([{
        "review_id": review.review_id,
        "restaurant_id": review.restaurant_id,
        "rating": float(review.rating) if review.rating else None,
        "review_text": review.review_text
    } for review in reviews])
