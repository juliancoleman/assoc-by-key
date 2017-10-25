const {
  assoc,
  compose,
  map,
  toPairs,
} = require("ramda");

const assocByKey = key1 => compose(
  map(([key2, obj]) => assoc(key1, key2, obj)),
  toPairs // eslint-disable-line
);

module.exports = assocByKey;
