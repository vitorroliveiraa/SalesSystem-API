import Route from "@ioc:Adonis/Core/Route";
// import UsersController from "App/Controllers/Http/UsersController";

Route.get("/users", "UsersController.index");
// Route.get("/users", async (ctx) => {
//   return new UsersController().index(ctx);
// });
