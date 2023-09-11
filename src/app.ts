import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { getHistoricalBalances } from "./services/getHistoricalBalances";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/historical-balances", async (req, res) => {
  const historicalBalance = await getHistoricalBalances();
  return res.json(historicalBalance);
});

export default app;
