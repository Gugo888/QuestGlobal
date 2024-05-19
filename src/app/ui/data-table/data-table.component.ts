import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataItem } from 'src/app/api/data-factory';
import { DataProvider } from 'src/app/api/data.provider';
import { SymbolService } from 'src/app/symbol.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  items$: Observable<DataItem[]>;
  selectedSymbol: string = '';
  showAddSymbolSelect = false;
  showBurgerMenu = false;
  unavailableSymbols: string[] = [];
  availableSymbols: string[] = [];
  symbols: { name: string, isShowed: boolean }[];

  constructor(private dataProvider: DataProvider, private symbolService: SymbolService) {
    this.items$ = this.dataProvider.stream$.asObservable();
    this.symbols = [];
  }

  ngOnInit(): void {
    this.loadSymbols();
    this.dataProvider.worker.postMessage({ frequency: 3000, symbols: this.symbols });
    this.checkUnavailableSymbols();
    this.checkAvailableSymbols();
  }

  toggleBurgerMenu(): void {
    this.showBurgerMenu = !this.showBurgerMenu;
  }

  toggleSymbolVisibility(symbol: string): void {
    const index = this.symbols.findIndex(item => item.name === symbol);
    if (index !== -1) {
      this.symbols[index].isShowed = !this.symbols[index].isShowed;
      this.saveSymbols();
      this.dataProvider.worker.postMessage({ frequency: 3000, symbols: this.symbols });
      this.checkUnavailableSymbols();
      this.checkAvailableSymbols();
    }
  }

  loadSymbols(): void {
    this.symbols = this.symbolService.loadSymbolsFromLocalStorage();
  }

  saveSymbols(): void {
    this.symbolService.saveSymbolsToLocalStorage(this.symbols);
  }

  checkUnavailableSymbols(): void {
    this.unavailableSymbols = this.symbols.filter(symbol => !symbol.isShowed).map(symbol => symbol.name);
  }

  checkAvailableSymbols(): void {
    this.availableSymbols = this.symbols.filter(symbol => symbol.isShowed).map(symbol => symbol.name);
  }

  openAddSymbol() {
    this.showAddSymbolSelect = !this.showAddSymbolSelect
  }

  trackById(index: number, item: DataItem) {
    return item.symbol;
  }
}
