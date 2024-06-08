## python run.py

from api import app, mongo
from api.models.filme_model import Filme
from api.services import filme_service


if __name__ == "__main__":
    with app.app_context():
        if 'filmes' not in mongo.db.list_collection_names():
            filme=Filme(
                titulo='',
                ano='0',
                categoria=""
            )
            filme_service.add_filme(filme)
    
    
    app.run(debug=True)