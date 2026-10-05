import { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
  // Obtener todos los presupuestos
  static getAll = async (req: Request, res: Response) => {
    const budgets = await Budget.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(budgets);
  };

  // Crear nuevo presupuesto
  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);
      await budget.save();

      res.status(201).json("Presupuesto creado");
    } catch (error) {
      //console.log(error)
      res
        .status(500)
        .json({ error: "Hubo un error al intentar guardar el presupuesto" });
    }
  };

  // Obtener presupuesto por ID
  static getById = async (req: Request, res: Response) => {
    res.status(200).json(req.budget);
  };

  // Actualizar presupuesto
  static updateById = async (req: Request, res: Response) => {
    await req.budget.update(req.body);
    res.status(201).json("Presupuesto actualizado");
  };

  // Eliminar presupuesto
  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.status(201).json("Presupuesto eliminado");
  };
}
