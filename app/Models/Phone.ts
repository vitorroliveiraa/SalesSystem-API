import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client.js";

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  clientId: number;

  @column()
  number: string;

  @belongsTo(() => Client)
  client: BelongsTo<typeof Client>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
