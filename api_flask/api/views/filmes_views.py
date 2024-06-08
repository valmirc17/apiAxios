from flask_restful import Resource
from api import api
from ..schemas import filme_schemas
from .. models import filme_model
from ..services import filme_service
from flask import make_response, jsonify, request


class FilmeList(Resource):
    def get(self):
        filmes = filme_service.get_filmes()
        f = filme_schemas.FilmeSchema(many=True)
        
        return make_response(f.jsonify(filmes), 200)
    
    def post(self):
        f = filme_schemas.FilmeSchema()
        validate = f.validate(request.json)
        if validate:
            return make_response(jsonify(validate), 400)
        else:
            titulo = request.json["titulo"]
            ano = request.json["ano"]
            categoria = request.json["categoria"]
            
            new_filme = filme_model.Filme(titulo=titulo, 
                                       ano=ano,
                                       categoria=categoria)
            result = filme_service.add_filme(new_filme)
            res = f.jsonify(result)
            return make_response(res, 201)
    
    
    
class FilmeDetails(Resource):    
    def get(self,id):
        filme = filme_service.get_filme_by_id(id)
        if filme is None:
            return make_response(jsonify(("filme não foi encontrado"),404))
        f=filme_schemas.FilmeSchema()
        return make_response(f.jsonify(filme),200)
    
    def put(self,id):
        filme_bd = filme_service.get_filme_by_id(id)
        if filme_bd is None:
            return make_response(jsonify("filme não encontrado"), 404)
        f = filme_schemas.FilmeSchema()
        validate = f.validate(request.json)
        if validate:
            return make_response(jsonify(validate),404)
        else:
            titulo = request.json["titulo"]
            ano = request.json["ano"]
            categoria = request.json["categoria"]
            new_filme = filme_model.Filme(titulo=titulo,
                                       ano=ano,
                                       categoria=categoria)
            filme_service.update_filme(new_filme, id)
            updated_filme = filme_service.get_filme_by_id(id)
            return make_response(f.jsonify(updated_filme),200)
    
    def delete(self, id):                    
        filme_bd = filme_service.get_filme_by_id(id)
        if filme_bd is None:
            return make_response(jsonify("filme não encontrado"), 404)
        filme_service.delete_filme(id)
        return make_response(jsonify("filme escluído com sucesso!", 204))

api.add_resource(FilmeList, '/filmes')    
api.add_resource(FilmeDetails, '/filmes/<id>')

