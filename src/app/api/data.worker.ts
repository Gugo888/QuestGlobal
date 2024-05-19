/// <reference lib="webworker" />

import { createDataItems } from "./data-factory";
import { Subscription, interval, startWith } from 'rxjs';

let intervalRef: Subscription;
let symbols: { name: string, isShowed: boolean }[];

addEventListener('message', ({ data }) => {
  const { frequency, symbols: newSymbols } = data;
  symbols = newSymbols;
  
  intervalRef?.unsubscribe();
  intervalRef = interval(frequency).pipe(startWith(0)).subscribe(() => {
    postMessage(createDataItems(symbols));
  });
});