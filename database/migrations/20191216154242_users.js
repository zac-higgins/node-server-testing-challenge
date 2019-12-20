exports.up = function (knex) {
    return knex.schema
        .createTable("roles", roles => {
            roles.increments();

            roles.string("name", 128)
                .notNullable()
                .unique();
        })
        .createTable("users", users => {
            users.increments();

            users.string("username", 128)
                .notNullable()
                .unique();

            users.string("password", 128).notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("roles");
};