import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartItem, Product} from "../entities/be-calls";

@Injectable({
  providedIn: 'root'
})
export class BeCallsService {

  constructor(private httpclient: HttpClient) {  }
  listProducts(limit: number = 0): Observable<Product[]> {
    if(limit === 0 || limit === null) {
      return this.httpclient.get<Product[]>(
        'https://factoryitems.azurewebsites.net/api/products/'
      );
    }
    return this.httpclient.get<Product[]>(
      'https://factoryitems.azurewebsites.net/api/products/',
      { params: { limit: limit.toString() } }
    );
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.httpclient.post<Product>(
      'https://factoryitems.azurewebsites.net/api/products/',
      product
    );
  }

  listPurchases(limit: number = 0): Observable<CartItem[]> {
    if(limit === 0 || limit === null) {
      return this.httpclient.get<CartItem[]>(
        'https://factoryitems.azurewebsites.net/api/purchase/'
      );
    }
    return this.httpclient.get<CartItem[]>(
      'https://factoryitems.azurewebsites.net/api/purchase/',
      { params: { limit: limit.toString() } }
    );
  }

  createPurchase(purchase: Partial<CartItem>): Observable<CartItem> {
    return this.httpclient.post<CartItem>(
      'https://factoryitems.azurewebsites.net/api/purchase/',
      purchase
    );
  }


}
