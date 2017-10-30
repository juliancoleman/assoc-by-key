const R = require("ramda");
const assocByKey = require("../src/index");

const data = {
  "1": {
    "first_name": "Julian",
    "last_name": "Coleman",
    "email_address": "julcol03@gmail.com",
  },
};

describe("#assocByKey", () => {
  it("is a function", () => {
    expect(assocByKey).to.be.a("function");
  });
  it("returns a function", () => {
    expect(assocByKey()).to.be.a("function");
  });
  it("should not mutate or destroy the original object", () => {
    assocByKey("id")(data);

    expect(data).to.be.a("object").and.to.not.own.property("id");
  });
  it("should safely return an empty array when not an object is passed in", () => {
    const assocById = assocByKey("id");
    const badFn = () => assocById(1);

    expect(badFn()).to.be.an("array");
  });
  it("should return an array", () => {
    const assocById = assocByKey("id");

    expect(assocById(data)).to.be.an.instanceof(Array);
  });
  it("should return an array of objects", () => {
    const assocById = assocByKey("id");
    const results = assocById(data);

    expect(R.all(R.is(Object), results)).to.be.true;
  });
});
