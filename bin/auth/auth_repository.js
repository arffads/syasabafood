const config = require('../infrastructure/configs/global_config');

class User {
    constructor (name, password) {
        this.name = name;
        this.password = password;
    }

    isValidPassword (password) {
        return this.password === password;
    }
}

module.exports.findByName = (name, cb) => {
    const userDatas = config.get('/basicAuthApi');
    const userData = userDatas.map((value) => {
        if (value.name === name) {
            return value;
        }
        return '';
    });
    const user = new User(userData[0].name, userData[0].password);
    cb(user);

};
