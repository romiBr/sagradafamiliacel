var localStrategy = require('passport-local').Strategy;
const dbConnection = require('../src/config/dbConnection');


module.exports = (passportdoc) => {
    passportdoc.serializeUser((user, done) => {
        done(null, user);
    });

    passportdoc.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passportdoc.use(new localStrategy({
        passReqToCallback: true,
    }, (req, email, password, done) => {
        var myConnection = dbConnection();

        var consulta = 'SELECT * FROM user_doc WHERE userName = ?';
        myConnection.query(consulta, email, (err, rows, fields) => {
            if (err) throw err;
            myConnection.end();
            if (rows.length > 0) {
                var user = rows[0];


                if (password == user.userPassword) {

                    return done(null, {
                        idUser: user.idUserDoc,
                        email: user.userName,
                        idDoctor: user.idDoctor
                    });
                }

            }

            return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
        })
    }));
}