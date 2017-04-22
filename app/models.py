from . import db

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    username = db.Column(db.String(80), unique=True)
    password= db.Column(db.String(255))
    email_address=db.Column(db.String(100))
    pword_hint=db.Column(db.String(100))
    wish = db.relationship('Wish', backref='person', lazy='dynamic')

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)
        
class Wish(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    wish_name_url=db.Column(db.String(250))
    wish_id=db.Column(db.Integer, db.ForeignKey('person.id'))
    wish_descript= db.Column(db.String(40))
    title=db.Column(db.String(30))
    thumbnail=db.Column(db.Text)
    
    
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)