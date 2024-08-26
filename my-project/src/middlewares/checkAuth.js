module.exports = async (ctx, next) => {
  if (ctx.request.path === "/car/ad") {
    console.log("Path is /car/ad");
  }

  // Вызов следующего middleware или контроллера
  await next();
};
