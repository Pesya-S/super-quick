import { Component, OnInit,Inject } from '@angular/core';
 
import {FormControl} from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { Observable } from 'rxjs';

import { startWith, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { State } from '../../../classes/State';
import { Shop } from '../../../classes/Shop';
import { DbService } from 'src/app/servises/db/db.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MessageComponent } from '../../message/message.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 text:string="";
filteredStates: Observable<State[]>;
  myControl:FormControl
  options: string[]
  id:number;

s:Shop;
s2:Shop;
 isManage:boolean=false;
//auto complete
arrShop:Shop[]=[];
shopCtrl=new FormControl();
filteredShops: Observable<Shop[]>;
  constructor(private db:DbService,private r:Router,public dialog: MatDialog,public func:FunctionsService)
   {
  this.s=new Shop();
  this.s.Code=4;
  this.s.NameShop="do";
  this.s2=new Shop();
  this.s2.Code=76;
  this.s2.NameShop="work";
  this.arrShop[0]=this.s;
  this.arrShop[1]=this.s2;
  this.id=7;
  let dref:MatDialogRef<ProgresBarComponent>;
  dref=  func.openDialog(dialog,30,10,ProgresBarComponent,null,false);
  this.db.getAllShop().subscribe(
    x=>{this.arrShop=<Shop []>x;
        this.fun();
        dref.close();
    });
    }

 fun() {

  // alert("work");
  this.filteredShops= this.shopCtrl.valueChanges
  .pipe(
    startWith(''),
    map(shop => shop ? this._filterShops(shop) : this.arrShop.slice())
  );

}
private _filterShops(value: string): Shop[]
 {
  const filterValue = value
  
  return this.arrShop.filter(shop => shop.NameShop.indexOf(filterValue) === 0);
}

enter()
{


  //  alert("it do");
  if(this.isManage==true)
  {
    // alert("mange"+this.db.getName());
      this.s= this.arrShop.filter(p=>p.NameShop==this.text)[0]; 
  if(this.s==null)
  {

    this.openDialog(""+"הי מנהל"+",","לא בחרת חנות, אתה יכול כעת להוסיף את החנות שלך");
    this.r.navigate(["AddShop"]);
  }
    else
      this.r.navigate(["Login"]);
  }

  else
  {
    if(this.s!=null&&this.s!=undefined&&this.text!="")
  {
    //  alert("costomer "+this.db.getName());
      this.r.navigate(["customer"]);
  }
  else
  this.openDialog(""+ "לקוח יקר"+"!","בחר חנות");
}
}  
  
  selectShop(value:string) : void
  {

    this.s= this.arrShop.filter(p=>p.NameShop==value)[0]; 
    this.db.setShop(this.s);
    
        // alert("you select "+value+" "+this.db.getName());
  }

  openDialog(header:string,message:string): void
   {
    const dialogRef = this.dialog.open(MessageComponent,
                                                                     {
                                                                      width: '50%',
                                                                      data: {header,message}
                                                                      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.nameShop = result; 
    });
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
  option()
  {
    // alert("do");
    this.r.navigate(["options"]);
  }





}
