from api import ma
from marshmallow import Schema, fields

class FilmeSchema(ma.Schema):
    class Meta:
        fields=("_id", "titulo", "ano", "categoria")
    
    _id = fields.Str()
    titulo = fields.Str(required= True)
    ano = fields.Str(required= True)
    categoria = fields.Str(required= True)