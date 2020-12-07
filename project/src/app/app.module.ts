import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { arrPath } from './pathes';
import{HttpClient,HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

// import components
import { AddShopComponent } from './components/owner/add-shop/add-shop.component';

import { ListProductComponent } from './components/product/list-product/list-product.component';
import { ToDeleteComponent } from './components/to-delete/to-delete.component';
import { AddProductComponent } from './components/owner/add-product/add-product.component';
import { LoginComponent } from './components/enterComponents/login/login.component';
import { HomeComponent } from './components/enterComponents/home/home.component';
import { InvalidPasswordPopUpComponent } from './components/enterComponents/invalid-password-pop-up/invalid-password-pop-up.component';
import { ViewShopComponent } from './components/view-shop/view-shop.component';
import { BuyingComponent } from './components/customer/buying/buying.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { UsingCanvasComponent } from './components/using-canvas/using-canvas.component';
import { BuildShopComponent } from './components/owner/build-shop/build-shop.component';
import { ToDelete2Component } from './components/to-delete2/to-delete2.component';
import { ToDelete3Component } from './components/to-delete3/to-delete3.component';
import { AddStandComponent } from './components/owner/add-stand/add-stand.component';
import { ProductToShopComponent } from './components/owner/product-to-shop/product-to-shop.component';

//להביא ימפורט מאנגולר מטיריאל
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, } from '@angular/material/autocomplete';
import {  MatInputModule, } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {  MatProgressBar, MatProgressBarModule } from "@angular/material";
import {MatListModule} from '@angular/material/list';

import {MatToolbarModule} from '@angular/material/toolbar'

import { AddProductPopUp1Component } from './components/owner/add-product-pop-up1/add-product-pop-up1.component';
import { BuildShopTableComponent } from './components/owner/build-shop-table/build-shop-table.component';
import { MessageComponent } from './components/message/message.component';
import { ListShopComponent } from './components/shop/list-shop/list-shop.component';
import { StartComponent } from './components/enterComponents/start/start.component';
import { AddProductPopUp2Component } from './components/owner/add-product-pop-up2/add-product-pop-up2.component';
import { ProgresBarComponent } from './components/progres-bar/progres-bar.component';
import { MatTabsModule, MatButtonModule } from '@angular/material';


















 


@NgModule({
  
  //כל הקומפוננטות
  declarations: [
    AppComponent,
    AddShopComponent,
    ListShopComponent,
    ListProductComponent,
    ToDeleteComponent,
     LoginComponent,
     HomeComponent,
     InvalidPasswordPopUpComponent,
     ViewShopComponent,
     BuyingComponent,
     CustomerComponent,
     UsingCanvasComponent,
     BuildShopComponent,
     ToDelete2Component,
     ToDelete3Component,
     AddStandComponent,
     ProductToShopComponent,
     AddProductPopUp1Component,
     AddProductPopUp2Component,
     AddProductComponent,
     BuildShopTableComponent,
     MessageComponent,
     StartComponent,
     ProgresBarComponent,
// MatDialogModule,
    // FirstComponent,
  ],
  entryComponents:[
    HomeComponent,
    InvalidPasswordPopUpComponent,
    AddProductComponent,
    AddProductPopUp1Component,
    AddProductPopUp2Component,
    MessageComponent,
    ProgresBarComponent,
  ],
  
  //מודולים שאנגולר משתמש
  imports: [
    MatSliderModule,
    HttpClientModule, 
     BrowserModule,
     FormsModule,
     RouterModule.forRoot(arrPath),
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      BrowserAnimationsModule,
      MatSliderModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      MatInputModule,
      MatSlideToggleModule,
      FormsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatRadioModule,
      MatMenuModule,
      MatDialogModule,
      MatChipsModule ,
MatButtonToggleModule,
MatTabsModule,
MatListModule,
MatToolbarModule,
MatProgressBarModule,
      //להביא מודול מאנגולר מטיריאל
  ],
  providers: [{
    provide: MAT_CHIPS_DEFAULT_OPTIONS,
    useValue: {
      separatorKeyCodes: [ENTER, COMMA]
    },
  }

],  


  //מאיזה קומפוננטה
  // bootstrap: [HomeComponent]
  // bootstrap: [AppComponent]
  bootstrap: [StartComponent]
})
export class AppModule { }
