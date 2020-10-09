const express = require('express');
const userService = require('../../services/users/user');
const auth = require('../../middlewares/auth')

let router = express.Router();

router.get('/', auth.authenticator(), userService.getUsers);

router.get('/:id', auth.authenticator(), userService.getUserById);

router.post('/', userService.createUser);

router.put('/:id', auth.authenticator(), userService.updateUser);

router.delete('/:id', auth.authenticator(), userService.deleteUser);

module.exports = router;