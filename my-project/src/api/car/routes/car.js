"use strict";

/**
 * car router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::car.car");

// module.exports = {
//   routes: [
//     {
//       method: "GET",
//       path: "/car/ad",
//       handler: "car.find",
//       config: {
//         policies: [],
//       },
//     },
//     // Другие маршруты могут быть добавлены здесь
//   ],
// };
