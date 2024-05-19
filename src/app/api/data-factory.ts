import { faker } from "@faker-js/faker";

const getRandomColor = () => {
  const colors = [
    { color: 'red', backgroundColor: '#e2bbbb' },
    { color: 'green', backgroundColor: '#beef91' },
    { color: 'blue', backgroundColor: '#d8ebfa' }
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomSymbolColor = () => {
  const symbolColors = [
    { symbol: '+', color: 'green' },
    { symbol: '-', color: 'red' }
  ];
  return symbolColors[Math.floor(Math.random() * symbolColors.length)];
};

export class DataItem {
  last: string;
  bid: string;
  bidColor: any;
  ask: string;
  askColor: any;
  chgCurrency: string;
  chgCurrencyRandomSymbol: any;
  chgPercent: string;
  chgPercentRandomSymbol: any;
  hight: string;
  low: string;
  vol: string;

  constructor(public symbol: string) {
    this.last = faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }).toFixed(2);
    this.bid = faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }).toFixed(2);
    this.bidColor = getRandomColor();
    this.ask = faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }).toFixed(2);
    this.askColor = getRandomColor();
    this.chgCurrency = faker.number.float({ min: 1, max: 99, multipleOf: 0.01 }).toFixed(2);
    this.chgCurrencyRandomSymbol = getRandomSymbolColor();
    this.chgPercent = faker.number.float({ min: 1, max: 99, multipleOf: 0.01 }).toFixed(2);
    this.chgPercentRandomSymbol = getRandomSymbolColor();
    this.hight = faker.number.float({ min: 1, max: 99, multipleOf: 0.01 }).toFixed(2);
    this.low = faker.number.float({ min: 1, max: 99, multipleOf: 0.01 }).toFixed(2);
    this.vol = faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }).toFixed(2);
  }
}

export const createDataItems = (symbols: { name: string, isShowed: boolean }[]): DataItem[] => {
  return symbols
    .filter(symbol => symbol.isShowed)
    .map(symbol => new DataItem(symbol.name));
};