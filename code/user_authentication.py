from flask import Flask, render_template_string
from flask_sqlalchemy import SQLAlchemy
from flask_user import UserManager, UserMixin, login_required
from flask_mail import Mail
from datetime import datetime

# Configuration class
class ConfigClass(object):
    """ Flask application config """
    # Flask settings
    SECRET_KEY = 'This is an INSECURE secret!! DO NOT use this in production!!'
    
    # Database settings
    SQLALCHEMY_DATABASE_URI = 'sqlite:///quickstart_app.sqlite'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Flask-Mail settings (for sending emails)
    MAIL_SERVER = 'smtp.example.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'your-email@example.com'
    MAIL_PASSWORD = 'your-email-password'
    MAIL_DEFAULT_SENDER = 'noreply@example.com'

    # Flask-User settings
    USER_APP_NAME = "Menu Match"
    USER_ENABLE_EMAIL = True  # Enable email for user login and password reset
    USER_ENABLE_USERNAME = True  # Enable username login as well
    USER_REQUIRE_RETYPE_PASSWORD = True  # Require password retype on registration
    USER_EMAIL_SENDER_NAME = USER_APP_NAME
    USER_EMAIL_SENDER_EMAIL = 'noreply@example.com'

# Flask application factory
def create_app():
    app = Flask(__name__)
    app.config.from_object(__name__ + '.ConfigClass')

    # Initialize Flask extensions
    db = SQLAlchemy(app)
    mail = Mail(app)

    # Define User model
    class User(db.Model, UserMixin):
        __tablename__ = 'users'
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(100, collation='NOCASE'), nullable=False, unique=True)
        email = db.Column(db.String(100), nullable=False, unique=True)
        password = db.Column(db.String(255), nullable=False)
        created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
        pass_token = db.Column(db.String(255), nullable=True)
        pass_token_valid_till = db.Column(db.TIMESTAMP, nullable=True)
        active = db.Column('is_active', db.Boolean(), nullable=False, server_default='1')

    # Create all database tables
    with app.app_context():
        db.create_all()

    # Setup Flask-User and specify the User data-model
    user_manager = UserManager(app, db, User)

    # Home page route
    @app.route('/')
    def home_page():
        return render_template_string("""
            {% extends "flask_user_layout.html" %}
            {% block content %}
                <h2>Welcome to the Menu Match</h2>
                <p><a href={{ url_for('user.register') }}>Register</a></p>
                <p><a href={{ url_for('user.login') }}>Sign in</a></p>
                <p><a href={{ url_for('member_page') }}>Member page</a> (login required)</p>
                <p><a href={{ url_for('user.logout') }}>Sign out</a></p>
            {% endblock %}
            """)

    # Members page route, accessible only to logged-in users
    @app.route('/members')
    @login_required
    def member_page():
        return render_template_string("""
            {% extends "flask_user_layout.html" %}
            {% block content %}
                <h2>Members page</h2>
                <p>This page is only accessible to logged-in users.</p>
                <p><a href={{ url_for('home_page') }}>Home page</a></p>
                <p><a href={{ url_for('user.logout') }}>Sign out</a></p>
            {% endblock %}
            """)

    return app

# Run the app
if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
