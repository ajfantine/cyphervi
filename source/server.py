from flask import Flask, request, jsonify
import json
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/test', methods = ['GET'])
def test():
    #url = request.args.get('url')
    print("hello world")
    return jsonify({"url": "abcd"})

@app.route('/getWords', methods = ['GET'])
def get_words():
    wordOne = "apple"
    wordTwo = "banana"
    wordThree = "car"
    return jsonify({"wordOne":wordOne, "wordTwo":wordTwo, "wordThree":wordThree})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
