const User = require('./domain');

const getUser = async (payload) => {
    const user = new User();
    const postCommand = async payload => user.getUser(payload);
    return postCommand(payload);
};

module.exports = {
    getUser
};