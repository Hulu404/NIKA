import unittest
import json

from app.modules.app.controller import AppController


def test_index():
    app_controller = AppController()
    result = app_controller.index()
    assert result == {'message': 'Hello, World!'}
