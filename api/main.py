import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery
images = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    text = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    params = {"query": text}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images_api():
    if request.method == "GET":
        res = images.find({})
        return jsonify([img for img in res])
    if request.method == "POST":
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def delete_image(image_id):
    image = images.find_one({"_id": image_id})
    if image:
        images.delete_one({"_id": image_id})
        return {"message": "Obraz został usunięty."}, 200
    else:
        return {"error": "Nie znaleziono obrazu o podanym ID."}, 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
