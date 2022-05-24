import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AppRoutingModule } from './app-routing.module';
import { PurchaseComponent } from './components/purchase/purchase.component';

import { HttpClientModule } from '@angular/common/http';
import { SavedTicketsComponent } from './components/saved-tickets/saved-tickets.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LikesComponent } from './components/likes/likes.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserPageComponent,
    UpdateUserComponent,
    RegisterComponent,
    LoginComponent,
    SavedTicketsComponent,
    PurchaseComponent,
    MainPageComponent,
    LikesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
