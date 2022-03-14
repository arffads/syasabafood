const CommonError = require('./common_error');

class ExpectstionFailederror extends CommonError {
  constructor (message) {
    super(message || 'Expectation Failed');
  }
}

module.exports = ExpectstionFailederror;
