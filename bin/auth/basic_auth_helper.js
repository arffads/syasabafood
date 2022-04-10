const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const User = require('./auth_repository');
const Table = require('./auth_table');

passport.use(new BasicStrategy((name, password, cb) => {
    User.findByName(name, (user) => {
        if (!user) {
            return cb(null, false);
        }
        if (!user.isValidPassword(password)) {
            return cb(null, false);
        }
        return cb(null, user);
    });
}));

passport.use(new BasicStrategy((no_meja, password, cb) => {
    Table.findTable(no_meja, (table) => {
        if (!table) {
            return cb(null, false);
        }
        if (table.isValidTable(password)){
            console.log(table,'dfafaddf');
            return cb(null, false);
        }
        
        return cb(null, table);
    });
}));

const isAuthenticated = passport.authenticate('basic', { session: false });
const init = () => passport.initialize();

module.exports = {
    isAuthenticated,
    init
}