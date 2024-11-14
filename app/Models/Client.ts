import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Address from "./Address.js";
import Phone from "./Phone.js";
import Sale from "./Sale.js";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @hasMany(() => Address)
  public address: HasMany<typeof Address>;

  @hasMany(() => Phone)
  public phones: HasMany<typeof Phone>;

  @hasMany(() => Sale)
  public sales: HasMany<typeof Sale>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
