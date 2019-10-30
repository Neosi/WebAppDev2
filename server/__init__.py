from flask import Flask
from pony.flask import Pony

app = Flask(__name__)
Pony(app)

import server.views