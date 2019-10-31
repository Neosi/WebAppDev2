from flask import Flask
from pony.flask import Pony

app = Flask(__name__)
app.config.from_pyfile('flask.cfg', silent=True)
Pony(app)

import server.views