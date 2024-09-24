import adminRouter from "./admin.js";

const webRouter = (app) => {
  app.use("/api/v1/admin", adminRouter);
  app.use("/", (req, res) => {
    res.send("Hello World!");
  });
};

export default webRouter;
