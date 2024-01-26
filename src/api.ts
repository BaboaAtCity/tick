import axios from 'axios'

const ALPHA_VANTAGE_API_KEY = "QQ48NX2QG7PT2KGP"

export async function getStockPrice(symbol: string): Promise<number | null> {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const price = response.data['Global Quote']['05. price'];
    return parseFloat(price);
  } catch (error: any) {
    console.error(`Error fetching stock price for ${symbol}: ${error.message}`);
    return null;
  }
}