"use strict";

/**
 * car controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::car.car");

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::car.car", ({ strapi }) => ({
//   async find(ctx) {
//     if (ctx.request.path === "/car/ad") {
//       ctx.send("hello");
//     } else {
//       ctx.send("bad request");
//     }

//     ctx.send(ctx.request.method);
//   },
// }));
