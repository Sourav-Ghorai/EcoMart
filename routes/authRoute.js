import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || Method post
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Forgot password
router.post("/forgot-password", forgotPasswordController);

//test route check for token authentication
// router.get("/test", requireSignIn, isAdmin, testController);

//protected user route-auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update user profile route
router.put("/profile", requireSignIn, updateProfileController);

export default router;
