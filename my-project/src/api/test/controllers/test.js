"use strict";

/**
 * A set of functions called "actions" for `auth`
 */

// const { createCoreController } = require("@strapi/strapi").factories;

const jwt = require("jsonwebtoken");

module.exports = {
  async hello(ctx) {
    // const { identifier, password } = ctx.request.body

    // if (!identifier) {
    //   return ctx.badRequest("Identifier and password are required");
    // }

    // const user = await strapi.query('user', 'users-permissions').findOne(username: identifier)

    ctx.send(`hello`);
  },
};
