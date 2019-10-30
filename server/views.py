from flask import request
from server import app
from server.entities import Character
from pony.orm import select
import json

# Character Routes
@app.route('/add-character', methods=['POST'])
def add_character():
    name = request.json.get('name')
    Character(name=name)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/remove-character', methods=['POST'])
def remove_character():
    id = request.json.get('id')
    Character[id].delete()
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/get-characters', methods=['GET'])
def get_characters():
    list = []
    query = select(c for c in Character)
    for q in query:
        list.append(q.to_dict())
    return json.dumps(list)