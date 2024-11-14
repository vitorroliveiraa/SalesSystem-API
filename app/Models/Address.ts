import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client.js";

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public clientId: number;

  @column()
  public street: string;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public zip: string;

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
