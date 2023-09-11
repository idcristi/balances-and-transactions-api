import "dotenv/config";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { getHistoricalBalances } from "./services/getHistoricalBalances";
import { validatorHistoryBalance } from "./utils/validator";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(
  "/historical-balances",
  validatorHistoryBalance,
  async (req: Request, res: Response) => {
    const historicalBalance = await getHistoricalBalances();
    return res.json(historicalBalance);
  }
);

export default app;
