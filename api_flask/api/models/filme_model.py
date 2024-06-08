from api import mongo

class Filme():
    def __init__(self, titulo, ano, categoria):
        self.titulo = titulo
        self.ano = ano
        self.categoria = categoria