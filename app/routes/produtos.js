
module.exports = function(app){
    
    app.get('/produtos',function(req,res){
        var con = app.infra.connectionFactory();
        var dao = new app.daos.ProdutoDao(con);
        
        dao.lista(function(err,result){
            res.render('produtos/lista',{lista:result});   
        });
        
        con.end();
    });
    
    app.get('/novo/livro',function(req,res){
        res.render('produtos/form') ;
    });
    
    app.post('/novo/livro',function(req,res){
        var con = app.infra.connectionFactory();
        var dao = new app.daos.ProdutoDao(con);
        
        var produto = req.body;
        dao.salvar(produto, function(err,result){
            res.redirect("/produtos");
        });
    });
    
}
