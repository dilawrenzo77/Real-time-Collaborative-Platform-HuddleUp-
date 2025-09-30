import { Router } from "express";
import { UserSignUp, Login, Logout, CheckAuth, authenticateToken, Profile } from "../controllers.ts/authControllers";

const router = Router()

router.post("/signUp", UserSignUp);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/profile", Profile)
router.get("/auth/status", CheckAuth);
router.get("/checkAuth", authenticateToken)


export default router;