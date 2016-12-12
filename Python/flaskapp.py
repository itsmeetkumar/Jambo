# cancer specialist in ahmedabad
# dentist specialist in vadodara
# events in vadodara
# events in mumbai
# i want to go bodakdev from ahmedabad


import os
from datetime import datetime
from flask import Flask, request, flash, url_for, redirect, \
     render_template, abort, send_from_directory
import api.events as e
import api.doctors as d

app = Flask(__name__)
app.config.from_pyfile('flaskapp.cfg')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/event/<category>/<city>')
def event(category, city):
    return e.call(category, city)

@app.route('/doctor/<special>/<city>')
def doctor(city, special):
    return d.call(city, special)

if __name__ == '__main__':
    app.run()
