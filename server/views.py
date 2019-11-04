from flask import request
from server import app
from server.entities import Character, Race, Class
from pony.orm import select
import json

# ------------------------------------------
# Character Routes
# ------------------------------------------
@app.route('/add-character', methods=['POST'])
def add_character():
    name = request.json.get('name')
    age = request.json.get('age')
    character_class = request.json.get('character_class')
    race = request.json.get('race')
    background = request.json.get('background')
    Character(name=name, age=age, character_class=character_class, race=race, background=background)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/remove-character', methods=['POST'])
def remove_character():
    id = request.json.get('id')
    Character[id].delete()
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/get-characters', methods=['GET'])
def get_characters():
    characters = select(c for c in Character)
    result = [c.to_dict(related_objects=True) for c in characters]
    for r in result:
        if r["race"] is not None:
            r["race"] = r["race"].name
        if r["character_class"] is not None:
            r["character_class"] = r["character_class"].name
    return json.dumps(result)

@app.route('/get-character', methods=['POST'])
def get_character():
    id = request.json.get('id')
    temp = Character[id].to_dict(with_collections=False, related_objects=True)
    temp["race"] = temp["race"].to_dict()
    temp["character_class"] = temp["character_class"].to_dict()
    print("DATA: " + str(temp))
    return json.dumps(temp)

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

# ------------------------------------------
# Class Routes
# ------------------------------------------
@app.route('/get-classes', methods=['GET'])
def get_classes():
    classes = select(c for c in Class)
    result = [c.to_dict() for c in classes]
    print(result)
    return json.dumps(result)

@app.route('/add-class', methods=['POST'])
def add_class():
    name = request.json.get('name')
    Class(name=name)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/remove-class', methods=['POST'])
def remove_class():
    id = request.json.get('id')
    Class[id].delete()
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}