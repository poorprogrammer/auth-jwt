const request = require("supertest");
const app = require("../app")

describe("API Authencation", () => {
    describe("post to auth to get token", () => {
        let postRequest;

        beforeEach(() => {
            postRequest = request(app).post("/ext/auth");
        })

        it("should get user with token when auth with valid user password", (done) => {
            postRequest.send({ username: "valid_user", password: 'password' })
                .expect(200)
                .expect(hasKey("token"))
                .end(function (err, res) {
                    if (err) done.fail(err);
                    done();
                });
        });

        it("should get 401 when auth without username", (done) => {
            postRequest
                .send({ password: 'password' })
                .expect(401)
                .expect({ message: 'Authentication failed.' })
                .end(function (err, res) {
                    if (err) done.fail(err);
                    done();
                });
        });

        it("should get 401 when auth with user does not exist", (done) => {
            postRequest
                .send({ username: "dese_not_exist", password: 'password' })
                .expect(401)
                .expect({ message: 'Authentication failed.' })
                .end(function (err, res) {
                    if (err) done.fail(err);
                    done();
                });
        });

        function hasKey(key) {
            return (res) => {   
                if (!(key in res.body)) throw new Error("missing key : " + key);
            }
        }

    });


});