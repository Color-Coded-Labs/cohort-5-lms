import express from "express";
import userRoute from "./userRoutes.js";
import courseRoute from "./courseRoutes.js";
import topicRoute from "./topicRoutes.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/courses", courseRoute);
router.use("/topics", topicRoute);

export default router;
