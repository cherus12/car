module.exports = {
  routes: [
    {
      method: "GET",
      path: "/test/hello",
      handler: "test.hello",
      config: {
        policies: [],
      },
    },
  ],
};
