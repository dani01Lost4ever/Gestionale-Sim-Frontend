import {Component, OnInit} from '@angular/core';
import {Product} from "../../entities/be-calls";
import {BeCallsService} from "../../services/be-calls.service";
import {CurrencyPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import {debounceTime, Subject} from "rxjs";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-prodotti',
  standalone: true,
  imports: [
    CurrencyPipe,
    TableModule,
    TagModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    ToastModule
  ],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css',
  providers: [MessageService]
})
export class ProdottiComponent implements OnInit{

  products: Product[] = [];
  value: number = 0;
  title: string = 'name';
  description: string= 'descrizione';
  stock: number = 0;
  netPrice: number = 0;
  loading: boolean = false;

  // Subject to use for debouncing search value input
  private searchUpdated: Subject<number> = new Subject<number>();

  constructor(private beCallsService: BeCallsService, private messageService: MessageService) { }
  visible: boolean = false;

  saveProduct(){
    let product: Partial<Product> = {
      title: this.title,
      description: this.description,
      stock: this.stock,
      netPrice: this.netPrice
    }
    this.beCallsService.createProduct(product).subscribe(
      (product: Product) => {
        this.products.push(product);
        this.visible = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
        this.loadProducts(this.value);
      },
      (error) => {
        console.error('Error creating product', error);
        this.visible = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an Error, Retry!' });
      }
    );
  }
  showDialog() {
    this.visible = true;
  }
  ngOnInit(): void {
    // Subscribe to the subject here - debounce time to limit requests while typing
    this.searchUpdated.pipe(
      debounceTime(500) // wait for 300ms pause in events
    ).subscribe((value) => {
      this.loadProducts(value);
    });

    this.loadProducts(this.value);
  }

  loadProducts(value: number): void {
    this.loading = true;
    this.beCallsService.listProducts(value).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching products', error);
        this.loading = false;
      }
    );
  }
  onValueChange(newValue: number): void {
    this.searchUpdated.next(newValue);
  }

  getStatus(status: number) {
    if(status<100 && status>0){
      return 'LOWSTOCK'
    }
    else if(status>=100){
      return 'INSTOCK'
    }
    else{
      return 'OUTOFSTOCK'
    }
  }
  getSeverity(status: number) {
    switch (this.getStatus(status)) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}
