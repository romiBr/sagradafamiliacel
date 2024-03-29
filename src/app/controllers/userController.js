//const bcrypt = require('bcryptjs');

module.exports = {
    getSignUp: (req, res, next) => {

        return res.render('users/signup', {
            authmessage: req.flash('infoIncor'),
            isAuthenticated: req.isAuthenticated(),
        });
    },

    postSignUp: (req, res, next) => {
        //var salt = bcrypt.genSaltSync(10);
        //var password = bcrypt.hashSync(req.body.password, salt);

        var dni = req.body.dni;

        const dbConnection = require('../../config/dbConnection');

        const myConnection = dbConnection();
        let consulta = 'SELECT * FROM pacientes p WHERE p.dniPaciente =' + dni;
        myConnection.query(consulta, (err, paciente) => {
            if (paciente.length > 0) {
                var user = {
                    userName: req.body.email,
                    userPassword: req.body.password,
                    name: paciente[0].nombrePaciente,
                    lastname: paciente[0].apellidoPaciente,
                    idPaciente: paciente[0].id,
                    tipoUsuario: 'p'
                };
                consulta = 'INSERT INTO user_web SET ?';
                myConnection.query(consulta, user, (err, resul, next) => {
                    if (err) throw err;

                    //myConnection.end();
                    req.flash('info', 'Se ha registrado correctamente.');
                    return res.redirect('signin');
                });

            }
        })

        //req.flash('infoIncor', 'No se pudo realizar el registro.');
        //return res.redirect('signup');

    },

    getSignIn: (req, res, next) => {
        return res.render('users/signin', { message: req.flash('info'), authmessage: req.flash('authmessage') });
    },

    getSignInDoc: (req, res, next) => {
        return res.render('users/signindoc', { message: req.flash('info'), authmessage: req.flash('authmessage') });
    },

    logout: (req, res, next) => {
        req.logout();
        res.redirect('/')
    },

    getUserPanel: (req, res, next) => {
        res.render('users/panel', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        })
    }
}