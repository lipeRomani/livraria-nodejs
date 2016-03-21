
module.exports = function(app){
    
    app.get('/livros',function(req,res){
        var con = app.infra.connectionFactory();
        var dao = new app.daos.ProdutoDao(con);
        
        dao.lista(function(err,result){
            //content negoctiation
            res.format({
                html:function(){
                    res.render('produtos/lista',{lista:result});           
                },
                json:function(){
                    res.json(result);
                }
            });
            
        });
        
        con.end();
    });
    
    app.get('/novo/livro',function(req,res){
        res.render('produtos/form',{produto:{},erros:{}}) ;
    });
    
    app.post('/novo/livro',function(req,res){
        var con = app.infra.connectionFactory();
        var dao = new app.daos.ProdutoDao(con);
        
        var produto = req.body;        
        req.assert('titulo',"Titudo é obrigatório").notEmpty();
        req.assert('descricao','é obrigatório').notEmpty();
        req.assert('preco',"Formato inválido").isFloat();
        var erros = req.validationErrors();
        
        if(erros){
            res.format({
                html:function(){
                    res.status(400).render('produtos/form',{erros:erros,produto:produto});
                },
                json:function(){
                    res.status(400).json(erros);
                }
            });    
            
            return;
        }       
        
        dao.salvar(produto, function(err,result){
            console.log(err);
            res.format({
                html:function(){res.redirect("/livros");},
                json:function(){res.json({msg:"Obrigado pelo cadastro!"})}
            });                   
        });
    });
    
}
