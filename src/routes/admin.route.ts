import express, { Router, Request, Response } from "express";
import { updateProduct, deleteSeller, deleteBuyer, deleteProduct, getTable, login, register } from "../controllers/admin.controller";
const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Admin Dashboard!");
});

router.post("/login", login);
router.post("/register", register);

router.delete("/delete-seller/:id", deleteSeller);
router.delete("/delete-buyer/:id", deleteBuyer);
router.delete("/delete-product/:id", deleteProduct);

router.patch("/update-product/:id", updateProduct);

router.get("/get/:table", getTable);

export default router;
