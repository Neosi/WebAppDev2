from flask import Flask
from server.views import *
from pony.flask import Pony

app = Flask(__name__)
Pony(app)