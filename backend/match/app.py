import os, sys, json
from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import ObjectId
from dotenv import load_dotenv
from mongoengine import connect
from models import *

app = Flask(__name__)
load_dotenv()
CORS(app)
connection = connect("peerprep", host=os.getenv('DB_URL'))

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

@app.route('/match/get',methods=['GET'])
def get_match():

    email = request.args.get('email', default=None, type=str)

    user = Match.objects(email=email).first()
    user.update(search=1)
    partners = Match.objects()
    for partner in partners:
        if user.email != partner.email and user.elo - 100 < partner.elo < user.elo + 100 and partner.search:
            user.update(search=0)
            partner.update(search=0)
            return jsonify({'status': True, "email": partner.email, "nickname": partner.nickname, "elo": partner.elo}), 200

    return jsonify({'status': False, "message": "Unable to find a match"}), 200

@app.route('/match/update',methods=['PUT'])
def update_match():
    
    email = request.args.get('email', default=None, type=str)
    elo = request.args.get('elo', default=None, type=int)

    user = Match.objects(email=email).first()
    user.update(elo=elo)

    return jsonify({'status': True, "message": "Successfully updated elo"}), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)