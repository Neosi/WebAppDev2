from pony.orm import Database, PrimaryKey, Set, Required

db = Database()
db.bind(provider='sqlite', filename='database.db', create_db=True)

class Character(db.Entity):
    id = PrimaryKey(int, auto=True)

class Class(db.Entity):
    id = PrimaryKey(int, auto=True)

class Allignment(db.Entity):
    id = PrimaryKey(int, auto=True)

class Race(db.Entity):
    id = PrimaryKey(int, auto=True)

class AffiliationList(db.Entity):
    id = PrimaryKey(int, auto=True)

class Tag(db.Entity):
    id = PrimaryKey(int, auto=True)

class TagList(db.Entity):
    id = PrimaryKey(int, auto=True)

class Ideal(db.Entity):
    id = PrimaryKey(int, auto=True)

class Desire(db.Entity):
    id = PrimaryKey(int, auto=True)

class Fear(db.Entity):
    id = PrimaryKey(int, auto=True)

class Trait(db.Entity):
    id = PrimaryKey(int, auto=True)

db.generate_mapping(create_tables=True)