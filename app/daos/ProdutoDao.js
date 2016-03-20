function ProdutoDao(connection){
    this._connection = connection;
}

ProdutoDao.prototype.lista = function(callback){
    this._connection.query('select * from livros',callback);
}

ProdutoDao.prototype.salvar = function(produtos,callback){
    this._connection.query('insert into livros set ?',produtos,callback);
}

module.exports = function(){
    return ProdutoDao;
}