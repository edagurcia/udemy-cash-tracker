import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import Expenses from "./Expense";

@Table({
  tableName: "budgets",
})
export default class Budget extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  @HasMany(() => Expenses, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare expenses: Expenses[];
}
