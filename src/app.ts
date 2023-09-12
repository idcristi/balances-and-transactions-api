import "dotenv/config";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { getHistoricalBalances } from "./services/getHistoricalBalances";
import { validatorHistoryBalance } from "./utils/validator";
import { SortEnum } from "./utils/enums";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(
  "/historical-balances",
  validatorHistoryBalance,
  async (req: Request, res: Response) => {
    try {
      const { from, to, sort } = req.query;
      const fromDate = new Date(from as string);
      const toDate = new Date(to as string);

      const historicalBalances = await getHistoricalBalances(
        fromDate,
        toDate,
        sort as SortEnum
      );
      return res.json(historicalBalances);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
);

export default app;
