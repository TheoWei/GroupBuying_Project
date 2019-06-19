module.exports = {
    index: (req, res, next) => {
        
        res.render('index',{title: 'INDEX'});
        
    },

    login: (req, res, next) => {
        res.render('index',{title: 'LOGIN'});
    },

    signup: (req, res, next) => {
        res.render('index',{title: 'SINGUP'});
    },

}