import express from "express";
import {
  getUser,
  Register,
  Login,
  Logout,
  addUser,
  editUser,
  deleteUser,
  getUserbyId,
} from "../controller/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get("/token", refreshToken);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);

//user
router.get("/users", getUser);
router.get("/users/:id", getUserbyId);
router.post("/users", addUser);
router.patch("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

export default router;
