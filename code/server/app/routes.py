# Author: @Anshul

from flask import Blueprint, request, jsonify
# from .models import db, Restaurant, Review

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def hello():
    return "Hello from backend"

@main.route('/restaurants', methods=['GET'])
def get_restaurants():
    return "Hello from backend | Restaurants"
