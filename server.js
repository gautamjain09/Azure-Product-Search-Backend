import express from 'express';
import { config } from './config.js';
import Database from './database.js';

const app = express();
const port = process.env.PORT || 3000;

const database = new Database(config);

app.use(express.json());

// READ All Products
app.get('/allProducts', async (_, res) => {
  try {
   const products = await database.readAll();
	 console.log(`products: ${JSON.stringify(products)}`);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

// READ Product By Product ID
app.post('/productsById', async (req, res) => {
  try {
    if (req.body.product_id) {
      const productId = req.body.product_id;
      console.log(`productId: ${productId}`);

      const result = await database.readById(productId);
      console.log(`products: ${JSON.stringify(result)}`);

      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

// READ Product By Product Name
app.post('/productsByName', async (req, res) => {
  try {
    if(req.body.product_name) {
      const productName = String(req.body.product_name);
      console.log(`productName: ${productName}`);

      const result = await database.readByName(productName);
      console.log(`products : ${JSON.stringify(result)}`);

      res.status(200).json(result);
    }
    else{
      res.status(404);  
    }
  } catch (error) {
    res.status(500).json({error : error?.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});