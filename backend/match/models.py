from mongoengine import Document
from mongoengine.fields import (
    StringField,
    IntField
)

class Match(Document):

    email = StringField()
    nickname = StringField()
    elo = IntField()
    search = IntField()

    meta = {
        "collection": "match",
        "indexes": ["email"]
    }