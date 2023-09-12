import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { SortEnum } from "../utils/enums";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

async function fetchTransactions(): Promise<any[]> {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/transactions`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return response.data.transactions;
  } catch (error) {
    throw error;
  }
}

async function fetchBalances(): Promise<{ amount: number; currency: string }> {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/balances`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function filterCancelledTransactions(
  transactions: any[]
): Promise<any[]> {
  return transactions.filter(
    (transaction) => transaction.status !== "CANCELLED"
  );
}

export async function getHistoricalBalances(
  from: Date,
  to: Date,
  sort?: SortEnum
): Promise<any[]> {
  const fromDate = moment(from, "YYYY-MM-DD");
  const toDate = moment(to, "YYYY-MM-DD");

  if (!fromDate.isValid() || !toDate.isValid()) {
    throw new Error("Invalid date format. Use YYYY-MM-DD.");
  }

  try {
    const [transactions, balances] = await Promise.all([
      fetchTransactions(),
      fetchBalances(),
    ]);

    const filteredTransactions = await filterCancelledTransactions(
      transactions
    );

    const dailyBalances = [];
    let currentBalance = balances.amount;

    for (
      let currentDate = fromDate.clone();
      currentDate.isSameOrBefore(toDate);
      currentDate.add(1, "days")
    ) {
      const transactionsForDate = filteredTransactions.filter((transaction) => {
        const transactionDate = moment(transaction.date);
        return transactionDate.isSame(currentDate, "day");
      });

      transactionsForDate.forEach((transaction) => {
        currentBalance += transaction.amount;
      });

      dailyBalances.push({
        date: currentDate.format("DD/MM/YYYY"),
        amount: currentBalance,
        currency: balances.currency,
      });
    }

    if (sort === "desc") {
      dailyBalances.sort((a, b) =>
        moment(b.date, "DD/MM/YYYY").diff(moment(a.date, "DD/MM/YYYY"))
      );
    }
    return dailyBalances;
  } catch (error) {
    throw error;
  }
}
