/* eslint-disable no-undef */
const assert = require('assert');
const loginController = require('../controllers/login');

describe('LoginController', () => {
  describe('isValidUserId', () => {
    it('should return true if valid user id', () => {
      const isValid = loginController.isValidUserId(['abc123', 'xyz321'], 'abc123');
      assert.equal(isValid, true);
    });

    it('should return false if invalid user id', () => {
      const isValid = loginController.isValidUserId(['abc123', 'xyz321'], 'abc1234');
      assert.equal(isValid, false);
    });
  });
});
