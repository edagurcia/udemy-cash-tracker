import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  tableName: "budgets",
})
export default class Budget extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;
}
