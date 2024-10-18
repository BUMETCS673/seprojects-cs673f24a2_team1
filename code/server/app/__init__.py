from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the database
# db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Load configuration from config.py
    app.config.from_object('config.Config')

    # Enable CORS for cross-origin requests
    CORS(app)

    # Initialize the database with the app
    # db.init_app(app)

    # Import routes
    from .routes import main
    app.register_blueprint(main)

    return app
