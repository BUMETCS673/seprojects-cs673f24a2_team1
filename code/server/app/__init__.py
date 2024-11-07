from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('app.config.Config')
    
    db.init_app(app)
    migrate.init_app(app, db)
    
    from .users import users_bp
    from .restaurants import restaurants_bp
    from .reviews import reviews_bp

    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(restaurants_bp, url_prefix="/api/restaurants")
    app.register_blueprint(reviews_bp, url_prefix="/api/reviews")
    
    return app