import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticated } from "../middleware/auth";

const router = Router();

router.use(limiter);

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre del usuario es obligatorio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Contraseña debe tener al menos 8 caracteres"),
  body("email").isEmail().withMessage("Correo no valido"),
  AuthController.createAccount,
);

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Token no valido"),
  handleInputErrors,
  AuthController.confirmAccount,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("El correo es obligatorio"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  handleInputErrors,
  AuthController.login,
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("El correo es obligatorio"),
  handleInputErrors,
  AuthController.forgotPassword,
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Token no valido"),
  handleInputErrors,
  AuthController.validateToken,
);

router.post(
  "/reset-password/:token",
  param("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("Token no valido"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Contraseña no valida"),
  handleInputErrors,
  AuthController.resetPasswordWithToken,
);

router.get("/user", authenticated, AuthController.user);

export default router;
