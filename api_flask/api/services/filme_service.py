from api import mongo
from ..models import filme_model
from bson import ObjectId

def add_filme(filme):
    mongo.db.filme.insert_one({
        'titulo':filme.titulo,
        'ano':filme.ano,
        'categoria':filme.categoria
    })
    
@staticmethod
def get_filmes():
    return list(mongo.db.filme.find())

@staticmethod
def get_filme_by_id(id):
    return mongo.db.filme.find_one({'_id': ObjectId(id)})

@staticmethod
def update_filme(self, id):
    mongo.db.filme.update_one({'_id': ObjectId(id)},
                              {'$set':
                                  {
                                      'titulo': self.titulo,
                                      'ano': self.ano,
                                      'categoria':self.categoria
                                  }})

@staticmethod
def delete_filme(id):
    mongo.db.filme.delete_one({'_id': ObjectId(id)})