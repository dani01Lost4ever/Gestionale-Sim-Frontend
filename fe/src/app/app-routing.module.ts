import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./component/cart/cart.component";
import {ProdottiComponent} from "./component/prodotti/prodotti.component";


const routes: Routes = [
  {
    path:'cart',
    component: CartComponent
  },
  {
    path:'',
    component: ProdottiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
