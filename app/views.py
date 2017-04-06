"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app, db, login_manager
from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from bs4 import BeautifulSoup
import requests
import urlparse
from models import WishersInfo

################################### api routes ##################################
@app.route('/api/users/register', methods=["POST"])
def apiregister():
    #save registration details to database
    firstname= request.form['firstname']
    lastname= request.form['lastname']
    username= request.form['username']
    password= hash(request.form['password'])
    email_address=request.form['email']
    pword_hint=request.form['hint']
        
    user= UserProfile(first_name=firstname, last_name=lastname, username=username, password= password, email_address = email_address, pword_hint = pword_hint)
    db.session.add(user)
    db.session.commit()
    quit()
    return # json status message success or failure

@app.route('/api/users/login', methods=["POST"])
def apilogin():
    # log user in
    return # json status message success or failure

@app.route('/api/users/{userid}/wishlist', methods=["POST"])
def apiadd(userid):
    # add items to users wish list
    return # json status message success or failure

@app.route('/api/users/{userid}/wishlist', methods=["GET"])
def apiwishlist(userid):
    # get users wishlist from database
    return #json wishlist

@app.route('/api/thumbnails', methods=["GET"])
def apithumbnails():
    #scrape url for images
    return # json containg list of image urls

@app.route('/api/users/{userid}/wishlist/{itemid}', methods=["DELETE"])
def apiremove(userid,itemid):
    # delete item from users wishlish
    return # json status message success or failure

################################## app routes ##########################
@app.route('/register_form', methods=["POST"])
def register():
    #get form data
    password = request.form['password']
    confirm = request.form['confirm-password']
    
    #verify password and confirm passsword match
    if password != confirm:
        error = "password does not match"
        return render_template('home.html', error = error)
    
    #call apiregister
    
    message ="registration successful"
    return render_template('home.html', message = message) #login page

@app.route('/login_form')
def loginb():
    #get form data
    
    #call apilogin
    return #wishlist page




###
# Routing for your application.
###

@app.route('/')
def home():
    """Render website's home page."""
    return render_template('home.html')

@app.route('/about/')
def about():
    """Render the website's about page."""
    return render_template('about.html')
    
@app.route('/add_user', methods=[ "GET", "POST"])
def add_user():
    
    """Render the website's add user page."""
    if request.method == 'POST':
        firstname= request.form['firstname']
        lastname= request.form['lastname']
        username= request.form['username']
        password= hash(request.form['password'])
        
        user= UserProfile(first_name=firstname, last_name=lastname, username=username, password= password)
        db.session.add(user)
        db.session.commit()
        quit()
    
    
    return render_template('add_user.html')
    
    
@app.route('/secure_page/')
@login_required
def secure_page():
    """Render a secure page on our website that only logged in users can access."""
    return render_template('secure_page.html')
    

@app.route("/login", methods=["GET", "POST"])
def login():
    
    if current_user.is_authenticated:
        
        # if user is already logged in, just redirec them to our secure page
        # or some other page like a dashboard
        return redirect(url_for('secure_page'))
    

    
    # if request.method == "POST" and form.validate_on_submit():
        
    #     username = form.username.data
    #     password = form.password.data
        
    #     user = UserProfile.query.filter_by(username=username, password=password).first()
        
    #     if user is not None:
    #         login_user(user)
            
    #         flash('Logged in successfully.', 'success')
            
    #         return redirect(url_for("secure_page"))
    #     else:
    #         flash('Username or Password is incorrect.', 'danger')
    
            
    return render_template("login.html")

# user_loader callback. This callback is used to reload the user object from
# the user ID stored in the session
@login_manager.user_loader
def load_user(id):
    return UserProfile.query.get(int(id))

###
# The functions below should be applicable to all Flask apps.
###

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port="8080")