import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  Default,
  Unique,
  AllowNull,
} from "sequelize-typescript";
import type Budget from "./Budget";

@Table({
  tableName: "users",
})
export default class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(80),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare password: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @Column({
    type: DataType.STRING(6),
  })
  declare token: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare confirmed: boolean;

  @HasMany(() => require("./Budget").default, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare budgets: Budget[];
}
