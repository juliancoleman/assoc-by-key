# assoc-by-key

[![Build Status](https://semaphoreci.com/api/v1/juliancoleman/assoc-by-key/branches/master/badge.svg)](https://semaphoreci.com/juliancoleman/assoc-by-key)
[![npm version](https://badge.fury.io/js/%40juliancoleman%2Fassoc-by-key.svg)](https://badge.fury.io/js/%40juliancoleman%2Fassoc-by-key)

A curried function using Ramda that transforms an object of
objects into an array of objects, where the key becomes a
property of that object. The function will return a new
array and will not mutate or destroy the original object.

This function performs the inverse of [index-by-key](https://github.com/juliancoleman/)

## Install

### `yarn`

```sh
yarn add @juliancoleman/assoc-by-key
```

### `npm`

```sh
npm i -S @juliancoleman/assoc-by-key
```

### Setup

This package provides the single function mentioned above.
You can specify the key on `require`, or you can specify a
key to `assoc` by later on.

```js
// initialize without specified key
const assocByKey = require("@juliancoleman/assoc-by-key");

// initialize with specified key at require
const assocById = require("@juliancoleman/assoc-by-key")("id");

// initialize with specified key later
const assocByFirstName = assocByKey("first_name");
```

Once required and a key is specified, you can then call the
function on your data to see the transformation. Again, the
function will return a new array and will not mutate or
destroy the original object.

Below is an example use on a `Promise` object returned by a
database call:

```js
const assocByKey = require("@juliancoleman/assoc-by-key");

const { getUsers } = appRequire("path/to/API");

(async () => {
  const assocById = assocByKey("id");
  const users = await getUsers();

  /*
  Example `users`

    { "1": { "first_name": "Julian",
              "last_name": "Coleman",
              "email_address": "julcol03@gmail.com"
            },
      "2": { "first_name": "Bob",
              "last_name": "Sagget",
              "email_address": "bob@sagget.com" } }
  */

  if (!users) {
    throw new Error("Unable to retrieve users");
  }

  return assocById(users);

})();

/*
results in the following output

[ { "id": 1,
    "first_name": "Julian",
    "last_name": "Coleman",
    "email_address": "julcol03@gmail.com" },
  { "id": 2,
    "first_name": "Bob",
    "last_name": "Sagget",
    "email_address": "bob@sagget.com" } ]
*/
```

Alternatively, this same thing can be achieved by doing the
following:

```js
API
  .getUser()
  .then(assocByKey("id"))
  .catch(UserNotFoundError, () => 404);
```
