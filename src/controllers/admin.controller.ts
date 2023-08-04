import { Request, Response } from "express";
import { connect } from "../sql/sqlConnection";

async function updateProduct(req: Request, res: Response) {
    try {
        const connection = await connect();
        const { id } = req.params;
        const { productName, productPrice, productDescription } = req.body;
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        const result = await connection.query(
            "UPDATE product SET product_name = ?, product_price = ?, product_description = ? WHERE product_id = ?",
            [productName, productPrice, productDescription, id]
        );
        console.log(result);
        res.status(200).json({ message: `Product with ID ${id} has been updated.` });
    } catch (err) {
        console.log("Some error Occured", err);
    }
}

async function deleteSeller(req: Request, res: Response) {
  try {
    const connection = await connect();
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid seller ID" });
    }
    const [seller] = await connection.query(
      "SELECT * FROM seller WHERE seller_id = ?",
      [id]
    );
    console.log(seller);
    await connection.query("DELETE FROM seller WHERE seller_id = ?", [id]);
    console.log(`Seller with ID ${id} has been deleted.`);
    res.json({ message: `Seller with ID ${id} has been deleted.` });
  } catch (err) {
    console.error("Error executing the query:", err);
  } finally {
    console.log("Closing the connection.");
  }
}

async function deleteBuyer(req: Request, res: Response) {
  try {
    const connection = await connect();
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid buyer ID" });
    }
    const [buyer] = await connection.query(
      "SELECT * FROM buyer WHERE buyer_id = ?",
      [id]
    );
    console.log(buyer);
    await connection.query("DELETE FROM buyer WHERE buyer_id = ?", [id]);
    console.log(`Buyer with ID ${id} has been deleted.`);
    res.json({ message: `Buyer with ID ${id} has been deleted.` });
  } catch (err) {
    console.error("Error executing the query:", err);
  } finally {
    console.log("Closing the connection.");
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    const connection = await connect();
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const [product] = await connection.query(
      "SELECT * FROM product WHERE product_id = ?",
      [id]
    );
    console.log(product);
    await connection.query("DELETE FROM product WHERE product_id = ?", [id]);
    console.log(`Product with ID ${id} has been deleted.`);
    res.json({ message: `Product with ID ${id} has been deleted.` });
  } catch (err) {
    console.error("Error executing the query:", err);
  } finally {
    console.log("Closing the connection.");
  }
}

async function getTable(req: Request, res: Response) {
  try {
    const connection = await connect();
    const { table } = req.params;
    const [rows] = await connection.query(`SELECT * FROM ${table}`);
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("Error executing the query:", err);
  }
}

async function login(req: Request, res: Response) {
  let { username, password } = req.body;
  const connection = await connect();
  const [rows] = await connection.query(
    "SELECT * FROM admin_login_data WHERE admin_user_name = ? AND admin_password = ?",
    [username, password]
  );
  console.log(rows);

  res.send(`Username: ${username} Password: ${password}`);
}

async function register(req: Request, res: Response) {
    let { firstName, lastName, username, password } = req.body;
    const connection = await connect();
    let result = await connection.query(
        "INSERT INTO admin (first_name, last_name, admin_user_name) VALUES (?, ?, ?)",
        [firstName, lastName, username]
    );
    console.log(result);
    result = await connection.query(
        "INSERT INTO admin_login_data (admin_user_name, admin_password) VALUES (?, ?)",
        [username, password]
    );
    console.log(result);
    res.status(200).json({ message: `User with username ${username} has been created.` });
}

export { updateProduct, deleteSeller, deleteBuyer, deleteProduct, getTable, login, register };
