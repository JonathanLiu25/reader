const { expect } = require("chai");
const request = require("supertest");
const app = require("./app.js");

/* global describe it */

describe("Get chapters correctly", () => {
  const server = request(app);

  it("gets all options", (done) => {
    server
      .get("/chapter/options")
      .expect(200)
      .end(done);
  });

  // give server some time to get options
  for (var i = 60; i < 650; i++) {
    describe("chapter ", () => {
      it(`${i}`, (done) => {
        server
          .get(`/chapter/${i}`)
          .expect(res => {
            expect(res.text.length).to.be.greaterThan(1000);
          })
          .end(done);
      }).timeout(10000);
    });
  }
});

