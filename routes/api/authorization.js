import express from "express";
import { authController } from "../../controllers/index.js";
import usersSchemas from "../../schema/userSchemaSVR.js";
import { validator } from "../../decorators/index.js";
import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", validator(usersSchemas.userSignupSchemaSVR), authController.signup);
authRouter.post("/login", validator(usersSchemas.userSigninSchemaSVR), authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;