import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getHistoricalBalances } from "../../src/services/getHistoricalBalances";
import { SortEnum } from "../../src/utils/enums";

describe("getHistoricalBalances", () => {
  let mockAxios: MockAdapter;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it("should return historical balances with valid date range and descending sorting", async () => {
    mockAxios.onGet(`${process.env.API_URL}/transactions`).reply(200, {
      transactions: [
        {
          amount: 249,
          currency: "EUR",
          date: "2022-01-01T09:08:59.637Z",
          status: "PROCESSED",
        },
        {
          amount: -229,
          currency: "EUR",
          date: "2022-01-01T10:57:13.735Z",
          status: "PROCESSED",
        },
        {
          amount: -367,
          currency: "EUR",
          date: "2022-01-01T21:27:31.865Z",
          status: "BOOKED",
        },
      ],
    });

    // Mock the Axios response for fetchBalances
    mockAxios.onGet(`${process.env.API_URL}/balances`).reply(200, {
      amount: 1000,
      currency: "EUR",
    });

    const fromDate = new Date("2022-01-01");
    const toDate = new Date("2022-01-01");
    const sort = SortEnum.desc;

    const historicalBalances = await getHistoricalBalances(
      fromDate,
      toDate,
      sort
    );

    expect(historicalBalances).toEqual([
      {
        date: "01/01/2022",
        amount: 653,
        currency: "EUR",
      },
    ]);
  });
});
