from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = " i have made a quite random key"
app.config['TOKEN_SECRET'] = " now i have made a super secret token string"


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://wisher:pa$$word123@localhost/wishlist"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # added just to suppress a warning

db = SQLAlchemy(app)

# Flask-Login login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

app.config.from_object(__name__)
from app import views