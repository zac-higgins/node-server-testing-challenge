const db = require('../database/dbConfig.js');

module.exports = {
    add,
    remove,
    getUsers,
    getUsersBy,
    getUsersById,
};

function getUsers() {
    return db("users").select("id", "username", "password").orderBy("id");
}

function getUsersBy(filter) {
    return db("users")
        .select("id", "username", "password")
        .where(filter);
}

function add(user) {
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return getUsersById(id);
        });
}

function getUsersById(id) {
    return db("users")
        .select("id", "username")
        .where({ id })
        .first();
}

function remove(id) {
    return db('users')
        .del()
        .where({ id })

}