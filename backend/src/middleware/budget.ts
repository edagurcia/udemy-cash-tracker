import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../models/Budget";

// Se declaran parametros para transferir de middleware a controller
// modificando el interface Request de express

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await param("budgetId")
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

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { budgetId } = req.params;

    if (typeof budgetId !== "string") {
      const error = new Error("El ID provisto no es válido");
      return res.status(400).json({ error: error.message });
    }

    const budget = await Budget.findByPk(budgetId);

    if (!budget) {
      const error = new Error("Presupuesto no encontrado");
      return res.status(404).json({ error: error.message });
    }

    req.budget = budget;

    next();
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await body("name")
    .notEmpty()
    .withMessage("Nombre del presupuesto es obligatorio")
    .run(req);

  await body("amount")
    .notEmpty()
    .withMessage("Cantidad del presupuesto es obligatorio")
    .isNumeric()
    .withMessage("Cantidad no valida")
    .custom((val) => val > 0)
    .withMessage("Cantidad debe ser mayor que cero")
    .run(req);

  next();
};

export function hasAccess(req: Request, res: Response, next: NextFunction) {
  if (req.budget.userId !== req.user.id) {
    const error = new Error("Acción no valida");
    return res.status(401).json({ error: error.message });
  }

  next();
}
