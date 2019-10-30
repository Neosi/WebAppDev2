from flask import Flask
from server.entities import db
from pony.flask import Pony

app = Flask(__name__)
Pony(app)