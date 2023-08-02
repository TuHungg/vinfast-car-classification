from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import os

from torch_utils import get_prediction, transform_image, get_image_from_url

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    # xxx.png
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=["GET"])
def home():
    return "Hello World!"

@app.route('/predict-url', methods=['POST'])
def predict_link():
    if request.method == 'POST':
        req_data = request.get_json()
        url_image = req_data['url_image']
    try:
        image = get_image_from_url(url_image)
        prediction = get_prediction(image)

        return jsonify(prediction)
    except:
            return jsonify({'error': 'error during prediction'})


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files.get('image')

        if file is None or file.filename == "":
            return jsonify({'error': 'no file'})
        if not allowed_file(file.filename):
            return jsonify({'error': 'format not supported'})

        try:
            img_bytes = file.read()
            tensor = transform_image(img_bytes)
            prediction = get_prediction(tensor)

            return jsonify(prediction)
        except:
            return jsonify({'error': 'error during prediction'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", debug=False, port=port)
    # app.run()


# serve(app, host='0.0.0.0', port=8080)
