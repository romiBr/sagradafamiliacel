const dbConnection = require('../../config/dbConnection');
const controllers = require('../controllers');
const authMiddleware = require('../../config/middleware/auth')

module.exports = app => {

    app.get('/', controllers.homeController.index);

    /*app.get('/prueba/:id', (req, res) => {
        //http://localhost:3000/1?name=romina&doctor=4
        console.log(req.params);
        console.log(req.query);
    })*/

    app.get('/menuUsuario', authMiddleware.isLogged, (req, res) => {
        res.render('web/menuUsuario', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    })

}