import express from "express";

import {
  deleteProfile,
  getProfile,
  signin,
  signup,
  updateProfile,
} from "../controllers";

import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/profile", isLoggedIn, getProfile);

// PUT /profile
router.patch("/profile", isLoggedIn, updateProfile);

// DELETE /profile
router.delete("/profile", isLoggedIn, deleteProfile);

export { router as userRouter };
