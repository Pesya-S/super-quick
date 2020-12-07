import { Routes} from "@angular/router"; 
import { AddShopComponent } from './components/owner/add-shop/add-shop.component';
import { ListShopComponent } from './components/shop/list-shop/list-shop.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { ToDeleteComponent } from './components/to-delete/to-delete.component';
import { AddProductComponent } from './components/owner/add-product/add-product.component';
import { LoginComponent } from './components/enterComponents/login/login.component';
import { HomeComponent } from './components/enterComponents/home/home.component';
import { BuyingComponent } from './components/customer/buying/buying.component';
import { ViewShopComponent } from './components/view-shop/view-shop.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { UsingCanvasComponent } from './components/using-canvas/using-canvas.component';
import { BuildShopComponent } from './components/owner/build-shop/build-shop.component';
import { ToDelete2Component } from './components/to-delete2/to-delete2.component';
import { ToDelete3Component } from './components/to-delete3/to-delete3.component';
import { ProductToShopComponent } from './components/owner/product-to-shop/product-to-shop.component';
import { AppComponent } from './app.component';

export const arrPath:Routes=[
{path:'AddShop',component: AddShopComponent},
{path:'ListShop',component:ListShopComponent},
{path:'ListProduct',component:ListProductComponent},
{path:'ToDelete',component:ToDelete3Component},
{path:'AddShop/:id',component: AddShopComponent},
{path:'AddProduct',component: AddProductComponent},
{path:'Login',component:LoginComponent },
{path:'home',component:HomeComponent },
{path:'buying',component:BuyingComponent },
{path:'viewShop',component:ViewShopComponent },
{path:'customer',component:CustomerComponent },
{path:'usingCanvas',component:UsingCanvasComponent },
{path:'buildShop',component:BuildShopComponent },
{path:'ProductToShop',component:ProductToShopComponent },
{path:'options',component:AppComponent },







]