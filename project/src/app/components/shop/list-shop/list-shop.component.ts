import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete} from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Shop } from '../../../classes/Shop';
import { DbService } from 'src/app/servises/db/db.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';


@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.css']
})
export class ListShopComponent implements OnInit {
id:number;
arrShop:Shop[]=[];
s:Shop;
s2:Shop;


//auto complete
shopCtrl=new FormControl();
filteredShops: Observable<Shop[]>;


  //constructor()
  constructor(private db:DbService,private r:Router,public dialog:MatDialog,public func:FunctionsService)
   { 
     this.s=new Shop();
     this.s.Code=4;
     this.s.NameShop="do";
     this.s2=new Shop();
     this.s2.Code=76;
     this.s2.NameShop="work";
     this.arrShop[0]=this.s;
     this.arrShop[1]=this.s;
     this.id=7;
     let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
     this.db.getAllShop().subscribe(x=>{this.arrShop=<Shop []>x; dref.close();});
     this.db.shop=this.arrShop[0];
    //  this.arrShop[1]=this.s2;

//auto complete
this.filteredShops= this.shopCtrl.valueChanges
.pipe(
  startWith(''),
  map(shop => shop ? this._filterShops(shop) : this.arrShop.slice())
);
}

private _filterShops(value: string): Shop[]
 {
  const filterValue = value.toLowerCase();
  
  return this.arrShop.filter(shop => shop.NameShop.toLowerCase().indexOf(filterValue) === 0);
}
private _filterShop(value: string):Shop[] {
  const filterValue = value.toLowerCase();
  return this.arrShop.filter(shop=>shop.NameShop.toLowerCase().indexOf(filterValue) === 0);
}


  ngOnInit() {
    this.s=new Shop();
    this.s.Code=4;
    this.s.NameShop="do";
    this.s2=new Shop();
    this.s2.Code=76;
    this.s2.NameShop="work";
    this.arrShop[0]=this.s;
    this.arrShop[1]=this.s;
  }
go()
{

this.r.navigate(["AddShop/"+this.id]);
}
}
