from flask import Blueprint

restaurants_bp = Blueprint('restaurants_bp', __name__)

from . import routes