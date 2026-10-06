import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/Expense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await param("expenseId")
    .isInt()
    .withMessage("ID no valido")
    .custom((val) => val > 0)
    .withMessage("ID no valido")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { expenseId } = req.params;

    if (typeof expenseId !== "string") {
      const error = new Error("El ID provisto no es válido");
      return res.status(400).json({ error: error.message });
    }

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      const error = new Error("Gasto no encontrado");
      return res.status(404).json({ error: error.message });
    }

    req.expense = expense;

    next();
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateExpenseInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await body("name")
    .notEmpty()
    .withMessage("Nombre del gasto es obligatorio")
    .run(req);

  await body("amount")
    .notEmpty()
    .withMessage("Cantidad del gasto es obligatorio")
    .isNumeric()
    .withMessage("Cantidad no valida")
    .custom((val) => val > 0)
    .withMessage("Cantidad debe ser mayor que cero")
    .run(req);

  next();
};
