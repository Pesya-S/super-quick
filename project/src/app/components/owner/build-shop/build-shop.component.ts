import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Stand } from '../../../classes/Stand';
import { Point } from '../../../classes/Point';
import { Shop } from '../../../classes/Shop';
import { Wall } from '../../../classes/Wall';
import { Shelf } from '../../../classes/Shelf';
import { Getaway } from '../../../classes/Getaway';
import { RequrestResponse } from '../../../classes/RequestResponse';

import { AddStandComponent } from '../add-stand/add-stand.component';
import { Connection } from 'src/app/classes/Connection';
import { BuildShopTableComponent } from '../build-shop-table/build-shop-table.component';
import { DbService } from 'src/app/servises/db/db.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MessageComponent } from '../../message/message.component';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';

@Component({
  selector: 'app-build-shop',
  templateUrl: './build-shop.component.html',
  styleUrls: ['./build-shop.component.css']
})

export class BuildShopComponent implements OnInit
 {

  @ViewChild('aliasInput',{static: false}) aliasInput: ElementRef<HTMLInputElement>;

   //#region משתנים

  copyMat:number[][]=[];
  state:string='';
 
nameShop:string;

  codeAlias:string='';
  stand:Stand;
  numShelves=0;
  iConnection=0;
  tableControl=new FormControl();
  isGray:boolean=false;
  @ViewChild(AddStandComponent,null) child: AddStandComponent;
  @ViewChild(BuildShopTableComponent,null) childTable: BuildShopTableComponent;
  level:number=1;
   //#endregion

   
  //#region בנאי
 constructor(private db:DbService,public dialog:MatDialog,public func:FunctionsService)
   {   
      let c:Connection=new Connection;
      c.Code=100;  
   //   this.copyMat=this.copyMatrix(this.mat);
  }
  ngOnInit() {
    this.childTable.shop=new Shop();
    this.childTable.shop.Code=10;
    this.childTable.shop.NameShop='newShop';
    this.childTable.shop.Connections=[];
    this.childTable.shop.Getaways=[];
    this.childTable.shop.Stands=[];
    this.childTable.shop.Walls=[];
    this.nameShop=this.childTable.shop.NameShop;

  }
textMessage="";
 chooseSub(sub:string)
 {
this.childTable.sub=sub;
if(sub=='w')
{this.childTable.nearest=false;
this.textMessage="הוסף קירות. אל תשכח להגדיר קיר לקופה- סמן בתיבת הסימון. זכור לבטל את הסימון בשאר הקירות"}
else if(sub=='g')
{this.childTable.nearest=false;
this.textMessage="סמן בתיבת הסימון כשאתה מוסיף נקודת גישה שהיא פתח החנות"}

 }
 onKeydown(event)
 {
   //alert(event.key)
   if(event.keyCode==13)
   { 
 this.add();
   }
  }
  add()
  {
    if(this.level==1)
    {
    if(this.childTable.p1.X==-1&&this.childTable.p2.X==-1)
    this.openDialog("שגיאה","בחר 2 נקודות");  
    else
     this.childTable.addToSub();   
    }
    else
    {
      this.childTable.sub='c';
      this.childTable.addToSub();
    }

  }


 //#endregion
//#region tdטיפול ב


  // if(this.p1.X!-1)
  // {
  //   for(let i:number=this.p1.X; i<x; i++)
  //   for(let j:number=this.p1.Y; j<y; j++) 
  //   this.mat[i][j]=5; 
  // }
  // this.isGray=true;
  // for(let i:number=0; i<n; i++)
  // t.rows[i].cells[y].style.border='red';
  //     let tbl:FormControl=this.tableControl;
  //  let t:HTMLTableElement= this.tableControl.value;
  // let t= this.tableH.nativeElement
  // t.rows[x].cells[y].style.backgroundColor='red';


//#endregion
 //#region זבל
 

 //#endregion 
//#region שלבים

// level2(x:number,y:number)
// {
// if(this.mat[x][y]==2)
// {
//     for(let i:number=0; i<this.childTable.shop.Stands.length; i++)
//   {
//     let a:Stand=this.childTable.shop.Stands[i];
//     if(x>=a.P1.X&&x<=a.P2.X  &&y>=a.P1.Y&&y<=a.P2.Y)
//     this.stand=a;
//     break;
//   }
//   this.child.setStand(this.stand);
//   this.level=3;
//   this.childTable.shop.Connection=[];
// }
// else if(this.level==3&&this.mat[x][y]==3)
// {
//   let g:Getaway;
//   let c:Connection;
//   for(let i:number=0; i<this.childTable.shop.Getaways.length; i++)
//   {
//     let a:Getaway=this.childTable.shop.Getaways[i];
//     if(x>=a.P1.X&&x<=a.P2.X  &&y>=a.P1.Y&&y<=a.P2.Y)
//     g=a;
//     break;
//   }
//  c=this.child.AddConnection(g,true);
//  this.childTable.shop.Connection.push(c);
// }
// else this.level1(x,y);
// }


//#endregion
//#region שמירה
  saveShop1()
  {
      let r:RequrestResponse;
        let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);     
    if(this.level==1 )
    {  
    this.db.addShop1(this.childTable.shop).subscribe(x=>{
      r=<RequrestResponse>x; 
      this.childTable.shop=<Shop>r.Data;
    this.openDialog("החנות נשמרה בהצלחה"," קוד החנות הוא "+this.childTable.shop.Code);
      this.childTable.shop.Connections=[];
      this.level=2;
    dref.close()});
    this.textMessage="בדוק שתיבת הסימון בחורה כשאתה מוסיף קשת קרובה ביותר"   ;
    this.childTable.nearest=true;
    }
    else     if(this.level==2 )
    {
      let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
      this.db.addShop2(this.childTable.shop.Connections).subscribe(x=>{
        r=<RequrestResponse>x; 
        this.childTable.shop=<Shop>r.Data;
        this.openDialog("החנות התעדכנה בהצלחה"," קוד החנות הוא "+this.childTable.shop.Code+"\n"+r.Message);
        //this.childTable.shop.Connections=[];
        this.level=2;
      dref.close();});   
    }

  }
  delPoint()
{
  this.childTable.p1.X=-1;
  this.childTable.p2.X=-1;
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
 });
}


  




}
