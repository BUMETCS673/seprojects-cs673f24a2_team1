# Author: @Jiho, @Prayushi
# Editor: @Anshul

from flask import jsonify, redirect, request, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

from . import auth_bp
from ..models import db, User
import requests
from ..auth0_config import *

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
@auth_bp.route('/login')
def login():
    return redirect(f"https://{AUTH0_DOMAIN}/authorize?response_type=code&client_id={AUTH0_CLIENT_ID}&redirect_uri={AUTH0_CALLBACK_URL}")
    
    # data = request.get_json()
    # if not data or not data.get('email') or not data.get('password'):
    #     return jsonify({"error": "Invalid data"}), 400
    
    # user = User.query.filter_by(email=data['email']).first()
    # if not user or not check_password_hash(user.pass_hash, data['password']):
    #     return jsonify({"error": "Invalid credentials"}), 401
    
    # # Create JWT access token with 1-hour expiry
    # access_token = create_access_token(identity=user.user_id, expires_delta=timedelta(hours=1))
    # return jsonify({"access_token": access_token, "user_id": user.user_id}), 200

@auth_bp.route('/callback')
def callback():
    code = request.args.get('code')
    token_url = f"https://{AUTH0_DOMAIN}/oauth/token"
    token_payload = {
        'grant_type': 'authorization_code',
        'client_id': AUTH0_CLIENT_ID,
        'client_secret': AUTH0_CLIENT_SECRET,
        'code': code,
        'redirect_uri': AUTH0_CALLBACK_URL,
    }
    token_info = requests.post(token_url, json=token_payload).json()
    session['user'] = token_info
    return jsonify(token_info)

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(f"https://{AUTH0_DOMAIN}/v2/logout?client_id={AUTH0_CLIENT_ID}&returnTo={AUTH0_LOGOUT_URL}")

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user' not in session:
            # Redirect to login if the user is not authenticated
            return redirect(url_for('auth_bp.login'))
        return f(*args, **kwargs)
    return decorated

# Protected Route for testing
@auth_bp.route('/protected')
@requires_auth
def protected():
    user_info = session.get('user')
    return jsonify({'message': 'You have access to this route', 'user': user_info})
