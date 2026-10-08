import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Expenses from "./Expense";
import User from "./User";

@Table({
  tableName: "budgets",
})
export default class Budget extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  @HasMany(() => Expenses, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare expenses: Expenses[];

  @ForeignKey(() => User)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}
