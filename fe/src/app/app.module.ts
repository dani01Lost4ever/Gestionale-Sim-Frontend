import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./component/navbar/navbar.component";
import {FooterComponent} from "./component/footer/footer.component";
import {ProdottiComponent} from "./component/prodotti/prodotti.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProdottiComponent,
    BrowserAnimationsModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
