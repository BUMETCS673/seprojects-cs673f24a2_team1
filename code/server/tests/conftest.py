import os
import sys
import pytest

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

from app import create_app
from app.models import db

@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()  # Create tables
        yield app
        db.session.remove()
        db.drop_all()  # Clean up the database

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def db_session(app):
    """Provide a session for database operations in tests."""
    with app.app_context():
        yield db