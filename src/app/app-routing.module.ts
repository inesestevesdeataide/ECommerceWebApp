import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './views/adminpage/adminpage.component';
import { ErrorpageComponent } from './core/errorpage/errorpage.component';
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { ManproductspageComponent } from './views/manproductspage/manproductspage.component';
import { ProductmanagementComponent } from './views/productmanagement/productmanagement.component';
import { ProductpageComponent } from './views/productpage/productpage.component';
import { SignupComponent } from './views/signup/signup.component';
import { UsermanagementComponent } from './views/usermanagement/usermanagement.component';
import { UserpageComponent } from './views/userpage/userpage.component';
import { ProductupdateComponent } from './views/productmanagement/productoperations/productupdate/productupdate.component';
import { ProductdeleteComponent } from './views/productmanagement/productoperations/productdelete/productdelete.component';
import { WishlistComponent } from './views/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'men/all', component: ManproductspageComponent },
  { path: 'product/:id', component: ProductpageComponent },
  { path: 'user', component: UserpageComponent },
  { path: 'admin', component: AdminpageComponent },
  { path: 'productmanagement', component: ProductmanagementComponent },
  { path: 'productupdate/:id', component: ProductupdateComponent },
  { path: 'productdelete/:id', component: ProductdeleteComponent },
  { path: 'usermanagement', component: UsermanagementComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }