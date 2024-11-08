# Author: @Prayushi, @Jiho

from flask import jsonify, request
from . import users_bp
from ..models import db, User
from werkzeug.security import generate_password_hash

@users_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"user_id": user.user_id, "username": user.username, "email": user.email} for user in users])

@users_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        username=data['username'],
        email=data['email'],
        pass_hash=data['pass_hash']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully", "user_id": new_user.user_id}), 201

@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({"user_id": user.user_id, "username": user.username, "email": user.email})

@users_bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.pass_hash = generate_password_hash(data['password'])
    db.session.commit()
    return jsonify({"message": "User updated successfully"})