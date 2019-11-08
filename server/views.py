from flask import request
from server import app
from server.entities import Character, Race, Class, Trait, Bond, Ideal, Flaw, Alignment
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
    traits = request.json.get('traits')
    ideals = request.json.get('ideals')
    bonds = request.json.get('bonds')
    flaws = request.json.get('flaws')
    character = Character(
        name=name, age=age, character_class=character_class, race=race, background=background)
    if traits is not None:
        for t in traits:
            character.traits.add(Trait[t])
    if ideals is not None:
        for i in ideals:
            character.ideals.add(Ideal[i])
    if bonds is not None:
        for b in bonds:
            character.bonds.add(Bond[b])
    if flaws is not None:
        for f in flaws:
            character.flaws.add(Flaw[f])
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/update-character', methods=['POST'])
def update_character():
    id = request.json.get('id')
    char = Character[id]
    char.background = request.json.get('background')
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/remove-character', methods=['POST'])
def remove_character():
    id = request.json.get('id')
    Character[id].delete()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/get-characters', methods=['GET'])
def get_characters():
    characters = select(c for c in Character)
    result = [c.to_dict(related_objects=True, with_collections=True)
              for c in characters]
    for r in result:
        if r["race"] is not None:
            r["race"] = r["race"].name
        if r["character_class"] is not None:
            r["character_class"] = r["character_class"].name
        if r["traits"] is not None:
            r["traits"] = [t.to_dict() for t in r["traits"]]
        if r["ideals"] is not None:
            r["ideals"] = [t.to_dict() for t in r["ideals"]]
        if r["bonds"] is not None:
            r["bonds"] = [t.to_dict() for t in r["bonds"]]
        if r["flaws"] is not None:
            r["flaws"] = [t.to_dict() for t in r["flaws"]]    
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


@app.route('/update-race', methods=['POST'])
def get_race():
    id = request.json.get('id')
    race = Race[id]
    race.name = request.json.get('name')
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/add-race', methods=['POST'])
def add_race():
    name = request.json.get('name')
    Race(name=name)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/remove-race', methods=['POST'])
def remove_race():
    id = request.json.get('id')
    Race[id].delete()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

# ------------------------------------------
# Class Routes
# ------------------------------------------
@app.route('/get-classes', methods=['GET'])
def get_classes():
    classes = select(c for c in Class)
    result = [c.to_dict() for c in classes]
    print(result)
    return json.dumps(result)


@app.route('/update-class', methods=['POST'])
def get_class():
    id = request.json.get('id')
    Class[id].name = request.json.get('name')
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/add-class', methods=['POST'])
def add_class():
    name = request.json.get('name')
    Class(name=name)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/remove-class', methods=['POST'])
def remove_class():
    id = request.json.get('id')
    Class[id].delete()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

# ------------------------------------------
# Trait Routes
# ------------------------------------------
@app.route('/get-traits', methods=['GET'])
def get_traits():
    traits = select(c for c in Trait)
    result = [c.to_dict() for c in traits]
    print(result)
    return json.dumps(result)


@app.route('/get-random-trait', methods=['GET'])
def get_random_trait():
    result = [c.to_dict() for c in Trait.select_random(2)]
    print(result)
    return json.dumps(result)


@app.route('/update-trait', methods=['POST'])
def get_trait():
    id = request.json.get('id')
    Class[id].description = request.json.get('description')
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/add-trait', methods=['POST'])
def add_trait():
    trait = request.json.get('description')
    Trait(description=trait)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/remove-trait', methods=['POST'])
def remove_trait():
    id = request.json.get('id')
    Trait[id].delete()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

# ------------------------------------------
# Ideal Routes
# ------------------------------------------
@app.route('/get-ideals', methods=['GET'])
def get_ideals():
    ideals = select(c for c in Ideal)
    result = [c.to_dict() for c in ideals]
    print(result)
    return json.dumps(result)


@app.route('/get-random-ideal', methods=['GET'])
def get_random_ideal():
    result = [c.to_dict() for c in Ideal.select_random(2)]
    print(result)
    return json.dumps(result)


@app.route('/update-ideal', methods=['POST'])
def get_ideal():
    id = request.json.get('id')
    Ideal[id].description = request.json.get('description')
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/add-ideal', methods=['POST'])
def add_ideal():
    ideal = request.json.get('description')
    Ideal(description=ideal)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/remove-ideal', methods=['POST'])
def remove_ideal():
    id = request.json.get('id')
    Ideal[id].delete()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

# ------------------------------------------
# Bond Routes
# ------------------------------------------
@app.route('/get-bonds', methods=['GET'])
def get_bonds():
    bonds = select(c for c in Bond)
    result = [c.to_dict() for c in bonds]
    print(result)
    return json.dumps(result)


@app.route('/get-random-bond', methods=['GET'])
def get_random_bond():
    result = [c.to_dict() for c in Bond.select_random(2)]
    print(result)
    return json.dumps(result)


@app.route('/update-bond', methods=['POST'])
def get_bond():
    id = request.json.get('id')
    Bond[id].description = request.json.get('description')
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/add-bond', methods=['POST'])
def add_bond():
    bond = request.json.get('description')
    Bond(description=bond)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/remove-bond', methods=['POST'])
def remove_bond():
    id = request.json.get('id')
    Bond[id].delete()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

# ------------------------------------------
# Flaw Routes
# ------------------------------------------
@app.route('/get-flaws', methods=['GET'])
def get_flaws():
    flaws = select(c for c in Flaw)
    result = [c.to_dict() for c in flaws]
    print(result)
    return json.dumps(result)


@app.route('/get-random-flaw', methods=['GET'])
def get_random_flaw():
    result = [c.to_dict() for c in Flaw.select_random(2)]
    print(result)
    return json.dumps(result)


@app.route('/update-flaw', methods=['POST'])
def get_flaw():
    id = request.json.get('id')
    Flaw[id].description = request.json.get('description')
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/add-flaw', methods=['POST'])
def add_flaw():
    flaw = request.json.get('description')
    Flaw(description=flaw)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/remove-flaw', methods=['POST'])
def remove_flaw():
    id = request.json.get('id')
    Flaw[id].delete()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

# ------------------------------------------
# Alignment Routes
# ------------------------------------------
@app.route('/get-alignments', methods=['GET'])
def get_alignments():
    alignments = select(c for c in Alignment)
    result = [c.to_dict() for c in alignments]
    print(result)
    return json.dumps(result)
