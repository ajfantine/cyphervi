from flask import Flask, request, jsonify
import json
import requests
from flask_cors import CORS
from nltk.corpus import stopwords
from three_words import generate_words
from url_list import url_list
import random


app = Flask(__name__)
CORS(app)



@app.route('/test', methods = ['GET'])
def test():
    #url = request.args.get('url')
    print("hello world")
    return jsonify({"url": "abcd"})

@app.route('/getWords', methods = ['GET'])
def get_words():
    url = random.sample(url_list, 1)[0]
    three_words = generate_words(url)
    wordOne = three_words[0]
    wordTwo = three_words[1]
    wordThree = three_words[2]
    return jsonify({"wordOne":wordOne, "wordTwo":wordTwo, "wordThree":wordThree, "newsURL":url})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
