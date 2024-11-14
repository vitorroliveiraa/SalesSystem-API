import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sales";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("client_id")
        .unsigned()
        .references("id")
        .inTable("clients")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.decimal("unit_price", 10, 2).notNullable();
      table.decimal("total_price", 10, 2).notNullable();
      table.timestamp("sale_date", { useTz: true }).notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
