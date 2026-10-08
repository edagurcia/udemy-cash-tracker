import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import User from "../models/User";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      const error = new Error(
        "Este correo ya esta siendo utilizado por otro usuario",
      );
      return res.status(409).json({ error: error.message });
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.token = generateToken();

      await user.save();

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      });

      res.status(201).json("Cuenta creada");
    } catch (error) {
      //console.log(error)
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body;

    const user = await User.findOne({ where: { token } });

    if (!user) {
      const error = new Error("Token no valido");
      return res.status(401).json({ error: error.message });
    }

    user.confirmed = true;
    user.token = null;

    await user.save();

    res.json("Cuenta confirmada");
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const error = new Error("Usuario no esta registrado");
      return res.status(404).json({ error: error.message });
    }

    if (!user.confirmed) {
      const error = new Error("La cuenta no ha sido confirmada");
      return res.status(403).json({ error: error.message });
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Contraseña incorrecta");
      return res.status(403).json({ error: error.message });
    }

    const jwt_token = generateJWT(user.id);
    res.json(jwt_token);
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const error = new Error("Usuario no esta registrado");
      return res.status(404).json({ error: error.message });
    }

    user.token = generateToken();
    await user.save();

    await AuthEmail.sendPasswordResetToken({
      name: user.name,
      email: user.email,
      token: user.token,
    });

    res.status(201).json("Revise su correo para instrucciones");
  };

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    const tokenExist = await User.findOne({ where: { token } });

    if (!tokenExist) {
      const error = new Error("Token no valido");
      return res.status(404).json({ error: error.message });
    }

    res.json("Token confirmado");
  };

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { token } });

    if (!user) {
      const error = new Error("Token no valido");
      return res.status(401).json({ error: error.message });
    }

    user.password = await hashPassword(password);
    user.token = null;

    await user.save();

    res.json("Contraseña actualizada correctamente");
  };

  static user = async (req: Request, res: Response) => {
    res.json(req.user);
  };
}
