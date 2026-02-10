from flask import Blueprint, make_response, jsonify
from .controller import AppController


app_bp = Blueprint('app', __name__)
app_controller = AppController()
@app_bp.route('/', methods=['GET'])
def index():
    """ Example endpoint with simple greeting.
    ---
    tags:
      - Example API
    responses:
      200:
        description: A simple greeting
        schema:
          type: object
          properties:
            data:
              type: object
              properties:
                message:
                  type: string
                  example: "Hello World!"
    """
    result=app_controller.index()
    return make_response(jsonify(data=result))
      