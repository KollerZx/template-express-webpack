exports.auth = (req,res, next) =>{
    res.locals.variableLocal = 'Valor da variavel local';
    next();
}