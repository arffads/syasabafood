const query = require('./query');
const wrapper = require('../../../../../helpers/utils/wrapper');

class User {
    async getUser (payload) {
        let getUser = await query.getUser();
        if (getUser.err) {
            return wrapper.error('err', getUser.message, getUser.code);
        } else if (getUser.data.length === 0) {
            return wrapper.data([], 'Data Not Found', 404);
        }
        getUser = getUser.data.map(v => Object.assign({}, v));
        return wrapper.data(getUser, 'Succes', 200);
    }
}
module.exports = User;
