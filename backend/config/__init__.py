from .development import DevelopmentConfig
from .production import ProductionConfig
from .testing import TestingConfig

configs = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
}


def get_config(config_name="development"):
    return configs.get(config_name, DevelopmentConfig)