import { Router } from "express";
import { userRouter } from "./userRouter";
import { postRouter } from "./postRouter";

const routes = Router({
  mergeParams: true,
});
routes.use("/blog_post", postRouter);
routes.use("/user", userRouter);
export { routes as appRouter };

///////////////////////////
