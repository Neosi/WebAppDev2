from flask import request
from server import app
from server.entities import Character, Race
from pony.orm import select
import json

# ------------------------------------------
# Character Routes
# ------------------------------------------
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
    characters = select(c for c in Character)
    result = [c.to_dict() for c in characters]
    print(result)
    return json.dumps(result)

# ------------------------------------------
# Race Routes
# ------------------------------------------
@app.route('/get-races', methods=['GET'])
def get_races():
    races = select(r for r in Race)
    result = [r.to_dict() for r in races]
    print(result)
    return json.dumps(result)

@app.route('/add-race', methods=['POST'])
def add_race():
    name = request.json.get('name')
    Race(name=name)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/remove-race', methods=['POST'])
def remove_race():
    id = request.json.get('id')
    Race[id].delete()
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}