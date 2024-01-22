import sql from 'mssql';

export default class Database {
  config = {};
  poolconnection = null;
  connected = false;

  constructor(config) {
    this.config = config;
    console.log(`Database: config: ${JSON.stringify(config)}`);
  }

  async connect() {
    try {
      console.log(`Database connecting...${this.connected}`);
      if (this.connected === false) {
        this.poolconnection = await sql.connect(this.config);
        this.connected = true;
        console.log('Database connection successful');
      } else {
        console.log('Database already connected');
      }
    } catch (error) {
      console.log(error);
      console.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
  }

  async disconnect() {
    try {
      this.poolconnection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error(`Error closing database connection: ${error}`);
    }
  }

  async readAll() {
    await this.connect();
    const request = this.poolconnection.request();

    const result = await request.query(`SELECT TOP 10 * FROM BigBasket_Products1 as Product`);
    return result.recordset;
  }

  async readById(id) 
  {
    await this.connect();
    const request = this.poolconnection.request();

    const result = await request
      .input('id', sql.Int, +id)
      .query(`SELECT * FROM BigBasket_Products1 as Product WHERE Product.indexx LIKE @id`);
    return result.recordset[0];
  }

  async readByName(name)
  {
    await this.connect();
    const request = this.poolconnection.request();

    const result = await request
      .input('name', sql.VarChar(256), name)
      .query(`SELECT Top 16 * FROM BigBasket_Products1 as Product WHERE Product.product LIKE '%' +  @name + '%'`);
    return result.recordset;
  }
}