import axios, { AxiosResponse } from "axios";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

async function fetchTransactions(): Promise<any[]> {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/transactions`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    console.log(response.data.transactions);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getHistoricalBalances() {
  try {
    const [transactions, balances] = await Promise.all([
      fetchTransactions(),
      fetchBalances(),
    ]);
    console.log(transactions, balances);
    return { transactions, balances };
  } catch (error) {
    throw error;
  }
}
