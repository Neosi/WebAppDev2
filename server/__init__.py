from flask import Flask
from pony.flask import Pony
from flask_cors import CORS

app = Flask(__name__)
app.config.from_pyfile('flask.cfg', silent=True)
Pony(app)
CORS(app)

import server.views