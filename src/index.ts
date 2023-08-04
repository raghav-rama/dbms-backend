import express from "express";
import adminRouter from "./routes/admin.route";
import cors from 'cors';

const app = express();

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
