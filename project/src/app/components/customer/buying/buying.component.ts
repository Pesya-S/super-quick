import { Component, OnInit, ViewChild, ElementRef, Input, Output, APP_INITIALIZER } from '@angular/core';
import { Product } from '../../../classes/Product';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, count } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { ExtraAlias } from '../../../classes/ExtraAlias';
import { Point } from '../../../classes/Point';
import { RequrestResponse } from '../../../classes/RequestResponse';
import { Goal } from 'src/app/classes/Goal';
import { EventEmitter } from '@angular/core';
import { DbService } from 'src/app/servises/db/db.service';
import { Alias } from 'src/app/classes/Alias';
import { Shop } from 'src/app/classes/Shop';
import { MessageComponent } from '../../message/message.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';


@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})

export class BuyingComponent implements OnInit
 {
@ViewChild('aliasInput',{static: false}) aliasInput: ElementRef<HTMLInputElement>;
@Output() onSelectPrduct:EventEmitter<Product>=new EventEmitter<Product>();
// @Output() onRemovePrduct:EventEmitter<Product[]>=new EventEmitter<Product[]>();
@Output() toShowPath:EventEmitter<Goal[]>=new EventEmitter<Goal[]>();  
@Output() toRestart:EventEmitter<void>=new EventEmitter<void>();  
//auto complete
pStart:Point=new Point();
  arrAlias:ExtraAlias[]=[];
  aliasCtrl=new FormControl();
  filteredAlias: Observable<ExtraAlias[]>
  
  selectedProducts:Product[]=[];
  selectedAlias:ExtraAlias[]=[];
   arrToSend:number[]=[];
  textP:string="";
  countSelect=0;
 
  errortext: string;
shop:Shop;
// constructor
  constructor(private db:DbService,private dialog:MatDialog,public func:FunctionsService)
  {
    //TODO: לבדוק אם יש חנות
    let s:Shop=db.getShop();
if(s==undefined)
{
  let dref:MatDialogRef<ProgresBarComponent>;
  dref=  func.openDialog(dialog,30,10,ProgresBarComponent,null,false);
    this.db.getAllShop().subscribe(x=>{ s=(<Shop[]>x)[0];
        if(s==undefined)
    this.openDialog("בחר חנות","לא נמצאה חנות להצגה")  
    else{ this.db.setShop(s);
      this.shop=s;
     this.initial()}
        dref.close();   })
}
else{this.shop=s; this.initial();}
  }

initial()
{
  let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
 this.db.GetExtraAliasList(this.shop.Code).subscribe(
    x=>{this.arrAlias=<ExtraAlias []>x;
      if(this.arrAlias==undefined||this.arrAlias.length==0)
    {
            this.openDialog("אין מוצרים","לא נמצאו מוצרים בחנות שבחרת");
            dref.close();
            return;
    }
        this.moveAlias();
        dref.close();
       });
}

  setPstart(e: Point) {
    this.pStart.X=e.X;
    this.pStart.Y=e.Y;
    // alert("buying get pstart "+e.X+","+e.Y);
  }

  moveAlias()
 {
    // alert("work");
    this.filteredAlias= this.aliasCtrl.valueChanges
    .pipe
    (
      startWith(''),
      map(a => a ? this._filterAlias(a) : this.arrAlias.slice())
    );
  }

  private _filterAlias(value: string):ExtraAlias []
  {
    const filterValue = value;
    return this.arrAlias.filter(a =>a.TextAlias.includes(filterValue) === true);
  }

  ngOnInit() {}

  onKeydown(event)
  {
    // alert(event.key)
    if(event.keyCode==13)
      this.findAndSelect();
  }
  findAndSelect()
  {
    let r=this.arrAlias.filter(a =>a.TextAlias.includes(this.textP));
    if(r==null|| r.length==0)
      return;
    this.textP=r[0].TextAlias;
    this.addItem(this.textP);
  }



// הוספת מוצר נבחר לרשימה
  addItem(value:string) : void
  {
    let e:ExtraAlias;
    e=(this.arrAlias.filter(p=>p.TextAlias==value)[0]);
    if(this.selectedProducts.filter(x=>x.Code==e.products[0].Code).length>0)
  {
    this.openDialog("המוצר כבר נבחר",
    " כבר בחרת את "+e.TextAlias);
    this.aliasInput.nativeElement.value = '';
    this.aliasCtrl.setValue(null);
        return;
  }

    this.selectedProducts[this.countSelect]=e.products[0];
    this.selectedAlias[this.countSelect]=e;
    this.countSelect++;
    this.aliasInput.nativeElement.value = '';
    this.aliasCtrl.setValue(null);
    this.onSelectPrduct.emit(e.products[0]);
  }
  removeItem(x:any)
  {
    this.errortext='';
    this.selectedAlias.splice(x,1);
    this.selectedProducts.splice(x,1);
    this.countSelect--;
    // this.onSelectPrduct.emit(e.products[0]);
  }

   
  sendProducts()
  {
    this.arrToSend=[];
    for(var i=0; i<this.selectedProducts.length; i++)
     this.arrToSend.push(this.selectedProducts[i].Code);
    // let p:Point=new Point(); p.X=8;p.Y=22;
    let r:RequrestResponse;
    let goal:Goal[];
    let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
   this.db.ComputeWay(this.arrToSend,this.pStart,true).subscribe(
    x=>{r=<RequrestResponse>x;
      if(r.Result==true)
      {
        // alert(r.Message);
    goal=<Goal[]>r.Data;
    this.alertGoal(goal);
    this.sendPathToShow(goal);
    let list:Product[];
  dref.close();    
      }
      else{
        this.openDialog("שגיאה בחישוב מסלול",
        'המערכת נכשלה בחישוב מסלול קנייה'+'.'+'יתכן שהבעיה בנתוני החנות'+'.'+' אם שגיאה זו חוזרת, פנה למנהל החנות ודווח לו על התקלה'
        );
        dref.close(); 
      }
    });
  }


  alertGoal(goal:Goal[])
  {
    
    let list:Product[]=[];
    let listp:Product[]=[];
    for(var i=0; i<goal.length; i++)
    {
      if(goal[i].kind=='s')
      {
        //  alert(' take from stand number '+goal[i].num+' '+goal[i].products[0].Alias.TextAlias);
         goal[i].products.forEach(x=>list.push(x));
      }
    }
    let listA:ExtraAlias[]=this.selectedAlias.copyWithin(0,0);
    this.selectedAlias=[];
    list.forEach(p=>{
      let i:number;
      for( i=0; i<this.selectedProducts.length; i++)if(this.selectedProducts[i].Code==p.Code) break;
      this.selectedAlias.push(listA[i]);
      listp.push(listA[i].products[0]);
    })
    this.selectedProducts=listp;
  }


  sendPathToShow(goal:Goal[])
  {
    this.toShowPath.emit(goal);  
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

  restart()
    {
this.arrToSend=[];
this.countSelect=0;
this.selectedAlias=[];
this.selectedProducts=[];
this.toRestart.emit();
this.pStart=new Point();

    }
}
