# Author: @Jiho, @Prayushi
# Editor: @Anshul

from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from . import auth_bp
from ..models import db, User
from datetime import timedelta

# Register (Sign Up)
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Invalid data"}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 409
    
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        username=data['username'],
        email=data['email'],
        pass_hash=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

# Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Invalid data"}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.pass_hash, data['password']):
        return jsonify({"error": "Invalid credentials"}), 401
    
    # Create JWT access token with 1-hour expiry
    access_token = create_access_token(identity=user.user_id, expires_delta=timedelta(hours=1))
    return jsonify({"access_token": access_token, "user_id": user.user_id}), 200

# Protected Route for testing
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"message": f"Hello {user.username}, this is a protected route"}), 200

# Logout (Optional - JWTs are stateless)
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # In a stateless JWT system, logout can be handled on the client side by deleting the token.
    # Alternatively, we can implement a token blacklist if you need server-side control.
    return jsonify({"message": "Logged out successfully"}), 200
