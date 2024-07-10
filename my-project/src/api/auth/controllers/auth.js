"use strict";

/**
 * A set of functions called "actions" for `auth`
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::car.car", ({ strapi }) => ({
//   async login(ctx) {
//     try {
//       const { email, password } = ctx.body;

//       const user = await strapi.query("user").findOne(email);

//       ctx.send({ user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
// }));

// async login(ctx, next) {
//   try {
//     const { email, password } = ctx.body;

//   } catch (err) {
//     ctx.badRequest("bad request", { moreDetails: err });
//   }
// },
