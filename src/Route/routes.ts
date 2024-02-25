import { Router } from "express";
import { userRoutes } from "../Module/User/userRoute";
import { blogPostRoutes } from "../Module/Post/postRoute";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/blog-post",
    route: blogPostRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
