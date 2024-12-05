# # tests/test_auth.py
# import sys
# import os

# SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# sys.path.append(os.path.dirname(SCRIPT_DIR))

# import pytest
# from app import create_app, db
# from app.models import User
# from werkzeug.security import generate_password_hash

# @pytest.fixture
# def client():
#     app = create_app()
#     app.config['TESTING'] = True
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
#     with app.app_context():
#         db.create_all()
#         user = User(username="testuser", email="test@example.com", pass_hash=generate_password_hash("securepassword"))
#         db.session.add(user)
#         db.session.commit()
        
#     with app.test_client() as client:
#         yield client

#     with app.app_context():
#         db.drop_all()

# def test_login_success(client):
#     """Test user login with correct credentials."""
#     response = client.post('/api/auth/login', json={
#         "email": "test@example.com",
#         "password": "securepassword"
#     })
#     assert response.status_code == 200
#     assert "access_token" in response.get_json()

# def test_login_failure(client):
#     """Test user login with incorrect credentials."""
#     response = client.post('/api/auth/login', json={
#         "email": "test@example.com",
#         "password": "wrongpassword"
#     })
#     assert response.status_code == 401
#     assert response.get_json()["error"] == "Invalid credentials"

# def test_register_success(client):
#     """Test user registration with valid data."""
#     response = client.post('/api/auth/signup', json={
#         "username": "newuser",
#         "email": "newuser@example.com",
#         "password": "securepassword"
#     })
#     assert response.status_code == 201
#     assert response.get_json()["message"] == "User registered successfully"

# def test_register_duplicate_email(client):
#     """Test registration failure with an existing email."""
#     # Pre-create a user
#     client.post('/api/auth/signup', json={
#         "username": "existinguser",
#         "email": "existing@example.com",
#         "password": "securepassword"
#     })
    
#     # Attempt to register again with the same email
#     response = client.post('/api/auth/signup', json={
#         "username": "newuser",
#         "email": "existing@example.com",
#         "password": "securepassword"
#     })
#     assert response.status_code == 409
#     assert response.get_json()["error"] == "Email already registered"