import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
// routers;
import userRouter from "./routers/user.router";
import { ConnectMongoDB } from "./database/mongoConnection";

const app = express();

config({
  path: ".env",
});

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);

// health checkup!;
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json("Health OK!");
});

app.listen(process.env.PORT, () => {
  ConnectMongoDB();
  console.log(`Backend connected at http://localhost:${process.env.PORT}`);
});
