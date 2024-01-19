import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {CartItem, Product} from "../../entities/be-calls";
import {debounceTime, Subject} from "rxjs";
import {BeCallsService} from "../../services/be-calls.service";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ButtonModule,
    CurrencyPipe,
    DialogModule,
    FormsModule,
    InputTextModule,
    SharedModule,
    TableModule,
    TagModule,
    ToastModule,
    DatePipe,
    DropdownModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [MessageService]
})
export class CartComponent implements OnInit{
  products: CartItem[] = [];
  value: number = 0;
  loading: boolean = false;
  productList: Partial<Product>[] = []; // Only hold id and title
  selectedProductId: Partial<Product> = {}; // Holds the selected product ID
  // Subject to use for debouncing search value input
  private searchUpdated: Subject<number> = new Subject<number>();
  protected date: Date = new Date();
  protected quantity: number = 0;
  protected pricePerUnit: number=0;

  constructor(private beCallsService: BeCallsService, private messageService: MessageService) { }
  visible: boolean = false;


  saveProduct(){

    let product: Partial<CartItem> = {
      product: this.selectedProductId.id,
      quantity: this.quantity,
      pricePerUnit: this.pricePerUnit,
    }
    console.log(product);
    this.beCallsService.createPurchase(product).subscribe(
      (product: CartItem) => {
        this.products.push(product);
        this.visible = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
        this.loadPurchases(this.value);
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

  changeSelected(){
    console.log(this.selectedProductId);
  }
  ngOnInit(): void {
    // Subscribe to the subject here - debounce time to limit requests while typing
    this.searchUpdated.pipe(
      debounceTime(500) // wait for 300ms pause in events
    ).subscribe((value) => {
      this.loadPurchases(value);
    });

    this.loadPurchases(this.value);

    this.beCallsService.listProducts().subscribe(
      (products: Product[]) => {
        this.productList = products;
      });

  }

  loadPurchases(value: number): void {
    this.loading = true;
    this.beCallsService.listPurchases(value).subscribe(
      (purchases: CartItem[]) => {
        this.products = purchases;
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

}
