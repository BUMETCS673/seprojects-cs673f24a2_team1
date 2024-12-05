import datetime
import json
import os
import time
from flask import jsonify, request
import pandas as pd

from app.models import Restaurant, Review
from . import manage_bp
from .. import db

ALLOWED_EXTENSIONS = ['.csv']

def allowed_file(filename):
    return filename[-4:].lower() in ALLOWED_EXTENSIONS

@manage_bp.route('/create-db', methods=['GET'])
def create_db():
    db.create_all()
    return jsonify({
        "STATUS": "SUCCESS",
    })

@manage_bp.route('/update-restaurants', methods=['POST'])
def update_restaurants():
    if 'file' not in request.files:
        return jsonify({
            'STATUS': 'FAILURE',
            'ERROR': 'No File Uploaded'
        })
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({
            'STATUS': 'FAILURE',
            'ERROR': 'No File Uploaded'
        })
    
    if file and allowed_file(file.filename):
        timestamp = time.strftime('%b-%d-%Y_%H%M', time.localtime())
        filename = f'restaurant-{timestamp}.csv'
        file.save(os.path.join(f'./data-files/', filename))
        
        restaurants = pd.read_csv(f'./data-files/{filename}')
        for _, row in restaurants.iterrows():
            new_restaurant = Restaurant(
                place_id=row.get("place_id"),
                name=row.get("name"),
                address=row.get("address"),
                phone=row.get("phone_number"),
                photo_ref = row.get("photo_ref"),
                google_url = row.get("google_url"),
                price_level = row.get("price_level"),
                overall_rating=row.get("rating"),
                vegan_rating=row.get("vegan_rating"),
                gluten_free_rating=row.get("gf_rating"),
                vegetarian_rating=row.get("veg_rating"),
                created_at=datetime.datetime.utcnow()
            )
            db.session.add(new_restaurant)
    
        db.session.commit()
        
        return jsonify({
            "STATUS": "SUCCESS",
            "Restaurants Added": len(restaurants),
        })
    
    else:
        return jsonify({
            "STATUS": "FAILURE",
            "ERROR": "file not accepted",
            "Test": file.filename
        })

@manage_bp.route('/update-reviews', methods=['POST'])
def update_reviews():
    if 'file' not in request.files:
        return jsonify({
            'STATUS': 'FAILURE',
            'ERROR': 'No File Uploaded'
        })
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({
            'STATUS': 'FAILURE',
            'ERROR': 'No File Uploaded'
        })
    
    if file and allowed_file(file.filename):
        timestamp = time.strftime('%b-%d-%Y_%H%M', time.localtime())
        filename = f'reviews-{timestamp}.csv'
        file.save(os.path.join(f'./data-files/', filename))
        
        reviews = pd.read_csv(f'./data-files/{filename}')
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
    
    else:
        return jsonify({
            "STATUS": "FAILURE",
            "ERROR": "file not accepted",
        })

@manage_bp.route('/delete-all-restaurants', methods=['POST'])
def delete_restaurants():
    num = Restaurant.query.delete()
    db.session.commit()
    return jsonify({
        "STATUS": "SUCCESS",
        "Restaurants Deleted": num,
    })
     
@manage_bp.route('/delete-all-reviews', methods=['POST'])
def delete_reviews():
    num = Review.query.delete()
    db.session.commit()
    return jsonify({
        "STATUS": "SUCCESS",
        "Reviews Deleted": num,
    })