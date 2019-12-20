const request = require('supertest');

const server = require('./server');

describe('server.js', function () {
    describe("environment", function () {
        it("should set environment to development", function () {
            expect(process.env.NODE_ENV).toBe("development");
        });
    });

    describe("GET /api", function () {
        it("should return a 200 OK", function () {
            // spin up the server
            return request(server)
                .get("/api")
                .then(res => {
                    expect(res.status).toBe(200);
                });
            // make GET request to /
            // look at the http status code for the response
        });

        it("should return a JSON", function () {
            return request(server)
                .get("/api")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should return {api: 'up'}", function () {
            return request(server)
                .get("/api")
                .then(res => {
                    expect(res.body.message).toBe("Project: node-backend-starter is up and running!");
                });
        });

        it('should return list of users', function () {
            return request(server)
                .get('/api/users')
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(Array.isArray(res.body)).toBe(true);
                });
        })
        it('should delete the selected user', function () {
            return request(server)
                .post('/api/auth/register')
                .send({ username: "test", password: "123" })
                .then(res => {
                    const id = res.body.id;
                    return request(server)
                        .delete(`/api/users/${id}`)
                        .then(res => {
                            expect(res.status).toBe(200);
                            expect(res.body.message).toBe("user deleted successfully")
                        })
                });
        })

        it.skip("auth example", function () {
            return request(server)
                .post("/api/auth/login")
                .send({ username: "zac", password: "123" })
                .then(res => {
                    const token = res.body.token;
                    console.log("token", res.body.token)
                    return request(server)
                        .get("/api/users")
                        .set("authorization", token)
                        .then(res => {
                            expect(res.status).toBe(200);
                            expect(Array.isArray(res.body)).toBe(true);
                        });
                });
        });
    });
});