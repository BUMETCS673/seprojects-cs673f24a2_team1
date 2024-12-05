# Authors: @Prayushi, @Anshul

from . import db
from datetime import datetime


class User(db.Model):
   __tablename__ = 'user'
   
   user_id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(120), unique=True, nullable=False)
   pass_hash = db.Column(db.String(128), nullable=False)
   created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
   pass_token = db.Column(db.String(255))
   pass_token_valid_till = db.Column(db.TIMESTAMP)

   # reviews = db.relationship('Review', backref='user', lazy=True)
   preferences = db.relationship('UserPreference', backref='user', lazy=True)

class Restaurant(db.Model):
   _tablename_ = 'restaurant'
   
   restaurant_id = db.Column(db.Integer, primary_key=True)
   place_id = db.Column(db.String(100))
   name = db.Column(db.String(100), nullable=False)
   address = db.Column(db.String(255))
   phone = db.Column(db.String(20))
   photo_ref = db.Column(db.String(1023))
   google_url = db.Column(db.String(1023))
   price_level = db.Column(db.DECIMAL)
   # cuisine_type = db.Column(db.String(50))
   overall_rating = db.Column(db.DECIMAL)
   vegan_rating = db.Column(db.DECIMAL)
   gluten_free_rating = db.Column(db.DECIMAL)
   vegetarian_rating = db.Column(db.DECIMAL)
   created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

   reviews = db.relationship('Review', backref='restaurant', lazy=True)
   # add_reviews = db.relationship('AddReview', backref='restaurant', lazy=True)

class Review(db.Model):
   _tablename_ = 'review'
   
   review_id = db.Column(db.Integer, primary_key=True)
   restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.restaurant_id'), nullable=False)
   rating = db.Column(db.DECIMAL)
   review_text = db.Column(db.Text)

# class AddReview(db.Model):
#    _tablename_ = 'add_review'
   
#    review_id = db.Column(db.Integer, primary_key=True)
#    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
#    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.restaurant_id'), nullable=False)
#    item_id = db.Column(db.Integer)
#    diet_id = db.Column(db.Integer, db.ForeignKey('diet.diet_id'))
#    rating = db.Column(db.DECIMAL)
#    review_text = db.Column(db.Text)
#    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

class Diet(db.Model):
   _tablename_ = 'diet'
   
   diet_id = db.Column(db.Integer, primary_key=True)
   diet_name = db.Column(db.String(50), nullable=False)

   # add_reviews = db.relationship('AddReview', backref='diet', lazy=True)
   preferences = db.relationship('UserPreference', backref='diet', lazy=True)

class UserPreference(db.Model):
   _tablename_ = 'user_preference'
   
   user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), primary_key=True)
   diet_id = db.Column(db.Integer, db.ForeignKey('diet.diet_id'), primary_key=True)