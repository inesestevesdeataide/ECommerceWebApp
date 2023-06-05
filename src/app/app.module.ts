import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorpageComponent } from './core/errorpage/errorpage.component';
import { CarouselComponent } from './views/mainpage/carousel/carousel.component';
import { FooterComponent } from './core/footer/footer.component';
import { FeaturedComponent } from './views/mainpage/featured/featured.component';
import { LogindialogComponent } from './views/logindialog/logindialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './views/signup/signup.component';
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { SignupinfodialogComponent } from './views/signup/signupinfodialog/signupinfodialog.component';
import { ProductpageComponent } from './views/productpage/productpage.component';

import { UserpageComponent } from './views/userpage/userpage.component';
import { InfodialogComponent } from './shared/utils/infodialog/infodialog.component';
import { SignupuserexistsinfodialogComponent } from './views/signup/signupuserexistsinfodialog/signupuserexistsinfodialog.component';
import { SaveuserchangesinfodialogComponent } from './views/userpage/saveuserchangesinfodialog/saveuserchangesinfodialog.component';
import { ManproductspageComponent } from './views/manproductspage/manproductspage.component';
import { AdminpageComponent } from './views/adminpage/adminpage.component';
import { ProductmanagementComponent } from './views/productmanagement/productmanagement.component';
import { UsermanagementComponent } from './views/usermanagement/usermanagement.component';
import { ProductstableComponent } from './views/productmanagement/productoperations/productstable/productstable.component';
import { ConfirmdialogComponent } from './shared/utils/confirmdialog/confirmdialog.component';
import { DeleteproductdialogComponent } from './views/productmanagement/productoperations/productdelete/deleteproductdialog/deleteproductdialog.component';
import { ProductupdateComponent } from './views/productmanagement/productoperations/productupdate/productupdate.component';
import { ProductdeleteComponent } from './views/productmanagement/productoperations/productdelete/productdelete.component';
import { ProductcreateComponent } from './views/productmanagement/productoperations/productcreate/productcreate.component';
import { ProductsearchComponent } from './views/productmanagement/productoperations/productsearch/productsearch.component';
import { FilterComponent } from './views/manproductspage/filter/filter.component';
import { WishlistComponent } from './views/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorpageComponent,
    CarouselComponent,
    FooterComponent,
    FeaturedComponent,
    LogindialogComponent,
    SignupComponent,
    MainpageComponent,
    SignupinfodialogComponent,
    ProductpageComponent,
    ManproductspageComponent,
    UserpageComponent,
    InfodialogComponent,
    SignupuserexistsinfodialogComponent,
    SaveuserchangesinfodialogComponent,
    AdminpageComponent,
    ProductmanagementComponent,
    UsermanagementComponent,
    ProductstableComponent,
    ConfirmdialogComponent,
    DeleteproductdialogComponent,
    ProductupdateComponent,
    ProductdeleteComponent,
    ProductcreateComponent,
    ProductsearchComponent,
    FilterComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }