from flask import jsonify
from typing import Any


def success_response(
    data: Any = None,
    message: str = "OK",
    status_code: int = 200,
) -> tuple:
    """Стандартный успешный ответ."""
    response: dict[str, Any] = {"success": True, "message": message}
    if data is not None:
        response["data"] = data
    return jsonify(response), status_code


def error_response(
    message: str,
    status_code: int = 400,
    errors: dict | None = None,
) -> tuple:
    """Стандартный ответ с ошибкой."""
    response: dict[str, Any] = {"success": False, "message": message}
    if errors:
        response["errors"] = errors
    return jsonify(response), status_code
