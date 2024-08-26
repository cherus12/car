"use strict";

/**
 * A set of functions called "actions" for `auth`
 */

// const { createCoreController } = require("@strapi/strapi").factories;

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");

module.exports = {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;

    if (!identifier || !password) {
      return ctx.badRequest("Identifier and password are required");
    }

    const user = await strapi
      .query("plugin::users-permissions.user")
      .findOne({ username: identifier });

    if (!user) {
      return ctx.badRequest(`User not found`);
    }

    const validPassword = await strapi
      .plugin("users-permissions")
      .service("user")
      .validatePassword(password, user.password);

    if (!validPassword) {
      return ctx.badRequest("Invalid password");
    }

    const token = jwt.sign(
      user,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzIyNjA5MzEyLCJleHAiOjE3MjUyMDEzMTJ9.QDDGGb8V5kLazUThMDitJihsY-b8veJTDIWCVJC8Dh8",
      { expiresIn: "15m" }
    );

    await strapi
      .query("plugin::users-permissions.user")
      .update({ where: { id: user.id }, data: { resetToken: token } });

    ctx.cookies.set("jwt", token, {
      httpOnly: true,
      maxAge: 60000,
      sameSite: "lax",
      path: "/",
    });

    ctx.send({ token });
  },
};
