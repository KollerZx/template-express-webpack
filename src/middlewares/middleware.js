exports.checkCsrfError = (err, req, res, next) =>{
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('403');
    }
}
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}