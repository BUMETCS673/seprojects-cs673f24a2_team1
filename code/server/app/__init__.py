# Author: @Prayushi, @Anshul

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from authlib.integrations.flask_client import OAuth
from functools import wraps
import os

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config.from_object('app.config.Config')
    app.secret_key = 'secret-key'
    
    db.init_app(app)
    migrate.init_app(app, db)
    
    with app.app_context():
        db.create_all()
    
    from .users import users_bp
    from .restaurants import restaurants_bp
    from .reviews import reviews_bp
    from .auth import auth_bp
    from .manage import manage_bp

    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(restaurants_bp, url_prefix="/api/restaurants")
    app.register_blueprint(reviews_bp, url_prefix="/api/reviews")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(manage_bp, url_prefix="/api/manage")
    
    return app