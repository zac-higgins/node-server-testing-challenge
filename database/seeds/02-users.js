exports.seed = function (knex) {
  return knex("users").insert([
    { username: "khalid", password: "pass" },
    { username: "john", password: "pass" },
    { username: "ingrid", password: "pass" },
  ]);
};