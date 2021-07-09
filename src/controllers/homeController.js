
class HomeController{

    index(req,res){
        res.render('index', {
            titulo: 'Titulo da pagina',
            numeros: [0,1,2,3,4,5]
        });
    }
}

module.exports = new HomeController();