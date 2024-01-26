interface Stock {
    symbol: string;
    price: number | null;
  }
  
  const trackedStocks: Stock[] = [];
  
  export function getTrackedStocks(): Stock[] {
    return trackedStocks;
  }
  
  export function addStock(symbol: string): void {
    if (!trackedStocks.find((stock) => stock.symbol === symbol)) {
      trackedStocks.push({ symbol, price: null });
    }
  }
  
  export function removeStock(symbol: string): void {
    const index = trackedStocks.findIndex((stock) => stock.symbol === symbol);
    if (index !== -1) {
      trackedStocks.splice(index, 1);
    }
  }
  