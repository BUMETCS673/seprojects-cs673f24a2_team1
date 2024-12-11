# Author: @Prayushi

import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///menumatch.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')

     # Database settings
    #SQLALCHEMY_DATABASE_URI = 'sqlite:///quickstart_app.sqlite'
    #SQLALCHEMY_TRACK_MODIFICATIONS = False
    
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
