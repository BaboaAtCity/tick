import inquirer from 'inquirer';
import { getStockPrice } from './api';
import { getTrackedStocks, addStock, removeStock } from './tracker';

async function displayStocks(): Promise<void> {
  const stocks = getTrackedStocks();
  console.log('Tracked Stocks:');
  stocks.forEach((stock) => {
    console.log(`${stock.symbol}: ${stock.price !== null ? `$${stock.price}` : 'Fetching...'}`);
  });
}

async function main(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Add Stock', 'Remove Stock', 'Display Stocks', 'Quit'],
      },
    ]);

    switch (action) {
      case 'Add Stock':
        const { symbol } = await inquirer.prompt([
          {
            type: 'input',
            name: 'symbol',
            message: 'Enter the stock symbol:',
          },
        ]);
        addStock(symbol);
        break;

      case 'Remove Stock':
        const { stockToRemove } = await inquirer.prompt([
          {
            type: 'list',
            name: 'stockToRemove',
            message: 'Select a stock to remove:',
            choices: getTrackedStocks().map((stock) => stock.symbol),
          },
        ]);
        removeStock(stockToRemove);
        break;

      case 'Display Stocks':
        await displayStocks();
        break;

      case 'Quit':
        process.exit(0);
    }
  }
}

main();
