import adminRouter from "./admin.js";
import userRouter from "./user.js";

const webRouter = (app) => {
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/", (req, res) => {
    res.send("Hello World!");
  });
};

export default webRouter;
