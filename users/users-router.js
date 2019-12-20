const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Users = require('./users-model.js');

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
});
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Users.getUsersById(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});
router.post('/', (req, res) => {
    Users.add(req.body)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(() => {
            Users.getUsers()
                .then(users => {
                    res.json(users);
                })
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
});

module.exports = router;