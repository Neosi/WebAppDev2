from pony.orm import Database, Required, Optional, PrimaryKey, Set

db = Database()
db.bind(provider='sqlite', filename='database.db', create_db=True)

class Class(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Optional(str, nullable=True)
    characters = Set('Character')

class Allignment(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Optional(str)
    characters = Set('Character')

class Race(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Optional(str, nullable=True)
    characters = Set('Character')

class Ideal(db.Entity):
    id = PrimaryKey(int, auto=True)
    description = Required(str)
    character = Set('Character')

class Bond(db.Entity):
    id = PrimaryKey(int, auto=True)
    description = Required(str)
    character = Set('Character')

class Flaw(db.Entity):
    id = PrimaryKey(int, auto=True)
    description = Required(str)
    character = Set('Character')

class Trait(db.Entity):
    id = PrimaryKey(int, auto=True)
    description = Required(str)
    character = Set('Character')

class Character(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Optional(str, nullable=True)
    age = Optional(int)
    affiliations = Set("Character", reverse='affiliations')
    character_class = Optional(Class)
    race = Optional(Race)
    allignment = Optional(Allignment)
    ideals = Set(Ideal)
    bonds = Set(Bond)
    flaws = Set(Flaw)
    traits = Set(Trait)
    tags = Set('Tag')
    background = Optional(str, nullable=True)
    appearance = Optional(str, nullable=True)

class Tag(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    character = Set(Character)

db.generate_mapping(create_tables=True)