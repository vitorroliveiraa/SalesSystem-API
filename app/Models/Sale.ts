import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Client from "./Client.js";
import Product from "./Product.js";

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public clientId: number;

  @column()
  public productId: number;

  @column()
  public quantity: number;

  @column()
  public unitPrice: number;

  @column()
  public totalPrice: number;

  @column()
  public saleDate: Date;

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
