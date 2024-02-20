import { Router } from "express";
import { userRoutes } from "../Module/User/userRoute";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
