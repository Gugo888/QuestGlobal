import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  constructor() {}

  public loadSymbolsFromLocalStorage(): { name: string, isShowed: boolean }[] {
    const storedSymbols = localStorage.getItem('symbolVisibility');
    if (storedSymbols) {
      return JSON.parse(storedSymbols);
    } else {
      const defaultSymbols = [
        { name: 'TSLA', isShowed: true },
        { name: 'NVDA', isShowed: true },
        { name: 'NVDA.TO', isShowed: true },
        { name: 'VFT.TO', isShowed: true },
        { name: 'MSFT', isShowed: true },
        { name: 'AAPL', isShowed: true },
        { name: 'NKE', isShowed: true },
        { name: 'XOM', isShowed: true },
        { name: 'MRK', isShowed: true },
        { name: 'ADBE', isShowed: true },
        { name: 'PYPL', isShowed: true },
        { name: 'GOOG', isShowed: true }
      ];

      localStorage.setItem('symbolVisibility', JSON.stringify(defaultSymbols));
      return defaultSymbols;
    }
  }

  public saveSymbolsToLocalStorage(symbols: { name: string, isShowed: boolean }[]): void {
    localStorage.setItem('symbolVisibility', JSON.stringify(symbols));
  }
}
