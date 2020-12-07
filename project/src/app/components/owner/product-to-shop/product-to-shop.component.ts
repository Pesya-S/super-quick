import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Tab } from 'src/app/classes/tab';


import { ExtraAlias } from 'src/app/classes/ExtraAlias';

import { MatDialog, MatSelectionListChange, MatSelectionList, MatListOption, MatDialogRef } from '@angular/material';
import { AddProductPopUp1Component } from '../add-product-pop-up1/add-product-pop-up1.component';
import { Product } from 'src/app/classes/Product';

import { Alias } from 'src/app/classes/Alias';

import { DbService } from 'src/app/servises/db/db.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductAlias } from 'src/app/classes/ProductAlias';
import { ProductShop } from 'src/app/classes/ProductShop';
import { AddProductComponent } from '../add-product/add-product.component';
import { Shop } from 'src/app/classes/Shop';
import { MessageComponent } from '../../message/message.component';
import { AddProductPopUp2Component } from '../add-product-pop-up2/add-product-pop-up2.component';
import { RequrestResponse } from 'src/app/classes/RequestResponse';
import { ProductShelf } from 'src/app/classes/ProductShelf';
import { Stand } from 'src/app/classes/Stand';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';


@Component({
  selector: 'app-product-to-shop',
  templateUrl: './product-to-shop.component.html',
  styleUrls: ['./product-to-shop.component.css']
})
export class ProductToShopComponent implements OnInit {
  // @ViewChild(MatSelectionList, {static: true}) private selectionList: MatSelectionList;

ToAddProductAliases:ProductAlias[]=[];
ToUpdateProduct:Product[]=[];
ToAddProductShops:ProductShop[]=[];
ToAddProductShelf:ProductShelf[]=[];
ToUpdateProductShelf:ProductShelf[]=[];
ToDeleteProductShop: ProductShop[]=[];
aliases:Alias[];
  barcode:string="";
departments:ExtraAlias[]=[];
iDep=0;
codeShop:number;
curProducts:Product[];
tempStandCode:number;
view:string="all";
matShop:number[][]=[];
productsShop:ProductShop[]=[];
s:Shop=new Shop();

  constructor(private db:DbService,public dialog: MatDialog,public func:FunctionsService)
   {
    let dref:MatDialogRef<ProgresBarComponent>;
   
 let shop: Shop= db.getShop();
 if(shop!=undefined)
 {this.s=shop; this.initial(shop);}
 else if(shop==undefined)
 { dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
 this.db.getAllShop().subscribe(x=>{ shop=(<Shop[]>x)[0];
  this.db.setShop(shop);
  this.s=shop;
this.initial(shop);
dref.close();
        })}

  }
initial(shop:Shop)
{
  if(shop!=undefined)
  this.codeShop=shop.Code;
    let e1:ExtraAlias=new ExtraAlias();
    e1.TextAlias="מכשירי חשמל"
    let e2:ExtraAlias=new ExtraAlias();
    e2.TextAlias=" תרופות"
    let e3:ExtraAlias=new ExtraAlias();
    e3.TextAlias=" ספרים";
     this.departments.push(e1);
     this.departments.push(e2);
     this.departments.push(e3);
 // this.departments[this.iDep].products 
let dref1=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
          this.db.GetProdcutsShop(shop.Code).subscribe(
           x=>{ this.productsShop=<ProductShop[]>x; 
        let   dref2=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);   
             this.db.getAllDepartment().subscribe(
               y=>{this.departments=<ExtraAlias []>y;
                   // this.moveAlias();
                   this.curProducts=this.departments[this.iDep].products;
                   this.departments.forEach(z=>z.products.forEach(w=>w.flag=false));
                   this.departments.forEach(z=>z.products.forEach(w=>{if(this.isExist(w.Code)) w.flag=true;}));
                   // this.departments=this.departments.reverse();
                this.ready(dref2); });                              
           this.ready(dref1)})
           let dref3=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
         // dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
         this.db.GeAliasList().subscribe(
           x=>{this.aliases=<Alias[]>x;
           dref3.close();}
         )
         let dref4=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
         let r: RequrestResponse ;     
         this.db.GetMap(shop).subscribe(
           x=>{
           r=  <RequrestResponse>x;
           this.matShop=<number[][]>(r.Data);
           dref4.close();}) 
}

  tab: number;
 department:string[]=['ניקיון','חלב','שימורים','ממתקים'];
  ngOnInit() {

    // this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }
ready(dref:MatDialogRef<ProgresBarComponent>)
{
  //alert("ready");
  dref.close();
}

  isExist(code:number):boolean
{
 // alert("i check");
  if(  this.productsShop.filter(p=>p.CodeProduct==code).length>0)
  {
 // alert("exist");
  return true;
}
}
  changeDep(index:number, event:any)
  {
   var tablinks = document.getElementsByClassName("tablink");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-orange", "");
    }
    this.chooseDep(index);
    //סתם חצוף על השגיאה הזו
    event.currentTarget.className += " w3-orange";
  }
    chooseDep(i:number)
    {
      // alert(i);
      this.iDep=i;
      if(this.view=='all')
      this.curProducts=this.departments[this.iDep].products;
      else if(this.view=='selected')
      this.curProducts=this.departments[this.iDep].products.filter(x=>x.flag==true);
      else if(this.view=='not')
      this.curProducts=this.departments[this.iDep].products.filter(x=>x.flag==false);    
      // let arr:boolean[]=[];
      // this.curProducts.forEach(x=>arr.push(x.flag));
      // this.curProducts.forEach(x=>x.flag=false);
      // let b:boolean;
      //  for(var i=0;i<this.curProducts.length;i++)
      //  {    
      //    if(i==3)     
      //    this.curProducts[i].flag=true;
      //   }
    }
    // ngAfterViewInit($event: MatSelectionListChange,i3:number)
    // {
    //   $event.option.selected=this.curProducts[i3].flag;
    // }
    setView(s:string)
    {      
      this.view=s;
     // alert(this.view);
      this.chooseDep(this.iDep);
  
    }
    chooseProduct(i:number,e:any)
    {
      let p:Product=this.curProducts[i];       
      this.openDialog(p,i);
    }
    openDialog(p:Product,i:number): void
     {
     let  b=true;
     let changePicture=false;
   let newProductAliases:Alias[]=[]; 
      const dialogRef = this.dialog.open(AddProductPopUp1Component, {
                                                                    width: '50%',
                                                                    data: {p: p, aliases: this.aliases,codeDep:this.departments[this.iDep].Code,
                                                                      dataResult:{newProductAliases,b: b,changePicture:changePicture}
                                                                    }
                                                                    });
      dialogRef.afterClosed().subscribe(result => {
                                                    console.log('The dialog was closed');
                                                    var r = result;
                                                    if(result!=undefined&&result.b!=undefined&&result.b==true)
                                                    {
                                                     result.newProductAliases.forEach(x=>this.ToAddProductAliases.push(x)) ;
                                                      this.openDialogfindStand(p,i,result);
                                                    }
                                                    else
                                                    {
                                                      //TODO: לבדוק איפה מבטלים
                                                      this.curProducts[i].flag=false; 
                                                     this.o.option.selected = false; 
                                                      this.cancelP(p,this.codeShop);
                                                    }
                                                                                                                                          
                                                    // alert(r);
                                                  });
    }
    selectP(product:Product,codeStand:number)
    {
      // let ps:ProductShop=new ProductShop();
      // ps.CodeProduct=p.Code;
      // ps.CodeShop=this.codeShop;
      // ps.IsExist=1;
      // this.ToAddProductShops.push(ps);
      let stand:Stand;
      let ps:ProductShelf=new ProductShelf();
      stand=this.db.getShop().Stands.filter(x=>x.Code==codeStand)[0];           
      ps.CodeShelf=stand.Shelves[0].Code;
      if(product.Code!=undefined&&product.Code!=null) ps.CodeProduct=product.Code;
      else ps.Product=product; 
      if(this.ToAddProductShelf.filter(y=>y.CodeProduct==product.Code).length>0)
        this.ToAddProductShelf.filter(y=>y.CodeProduct==product.Code)[0].CodeShelf=ps.CodeShelf;
      if(this.productsShop.filter(x=>x.CodeProduct==ps.CodeProduct).length>0)
        this.ToUpdateProductShelf.push(ps);
     else
      this.ToAddProductShelf.push(ps);
     // alert(" get product shelf code stand is "+codeStand+"\n code shelf "+ps.CodeShelf);
      // אם הכל עבד עד עכשיו, אז אפשר אכן לבחור את המוצר. צריך לבדוק אם הוא לא בחור כבר, ואם כן אז באיזה מערך לעדכן
 
    }
    cancelP(product:Product,codeShop:number)
    {
      if(this.ToAddProductShelf.filter(y=>y.CodeProduct==product.Code).length>0)
      this.ToAddProductShelf= this.ToAddProductShelf.filter(y=>y.CodeProduct!=product.Code);
   else if(this.productsShop.filter(x=>x.CodeProduct==product.Code).length>0)
     {
      let ps:ProductShop=new ProductShop();
      if(product.Code!=undefined&&product.Code!=null) ps.CodeProduct=product.Code;
      else ps.Product=product; 
      ps.CodeShop=codeShop;
       this.ToDeleteProductShop.push(ps);
     } 
  //  else אם עוד לא שמרתי והמוצר עוד לא קיים בחנות אז לא צריך לעשות כלום!
    }

    // הוספת מוצר חדש לגמרי למאגר המוצרים
  addProduct()
  {
    
    let p:Product=new Product();
    const dialogRef = this.dialog.open(AddProductComponent, {
                                                                  width: '40%',
                                                                   data: {Dep:this.departments[this.iDep],p:p}
                                                                  });
    dialogRef.afterClosed().subscribe(result => {
//debugger;
                                                  console.log('The dialog was closed');
                                                  var r = result;
                                                  if(r)
                                                  {

                                                  this.departments[this.iDep].products.push(<Product>r);
                                                  (<Product>r).flag=false;
                                                  //this.openDialogfindStand(p,this.departments[this.iDep].products.length-1);
                                                   }

                                                });
  }



    



searchByBarcode(){
  //alert(this.barcode);
}


save()
{
  let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
  this.db.saveProductsShop(this.ToAddProductShelf,this.ToAddProductAliases,this.ToUpdateProduct,this.codeShop,this.ToUpdateProductShelf,this.ToDeleteProductShop).subscribe(
    x=>{
      this.openDialog2("השמירה הסתיימה"," נשמרו המוצרים שבחרתם לחנות ");
      dref.close();
    });
}

funclick(i:number)
{
  this.curProducts[i].flag=!this.curProducts[i].flag;
}
o:MatSelectionListChange;
selectedChanged($event: MatSelectionListChange,i3:number) {
this.o=$event;
  
}

shouldDoIt = true; // initialize it to true for the first run

callFunction(stuff) {
    if (this.shouldDoIt) {
        // Do all the things with the stuff
        this.shouldDoIt = false; // set it to false until you need to trigger again
    }
}
openDialog2(header:string,message:string): void
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

//הפופ אפ של קישור מוצר לסטנד
openDialogfindStand(product:Product,i:number,result2:any): void
{
  //debugger;
  var r;
  let numStand:number;
 const dialogRef = this.dialog.open(AddProductPopUp2Component,
                                                        {
                                                                   width: '50%',
                                                                   data: {product:product,mat: this.matShop,numStand:numStand}
                                                                   });

 dialogRef.afterClosed().subscribe(result => {

  r=result;

     console.log('The dialog was closed');
     if(r!=null)
     {
      //  addProductToStand(); 
      try
      {
         // בחירת מוצר
        this.selectP(product,r);  
        this.curProducts[i].flag=true; 
        this.o.option.selected = true;
      if(result2.changePicture)
      {
        this.ToUpdateProduct.push(product);
      }
       this.chooseDep(this.iDep);   
      }
      catch{
        this.openDialog2("הסטנד לא זוהה", " המקום שבחרת שגוי"+"\n"+"אם תרצה שהמוצר ישמר בחנות, נסה שוב");
        this.curProducts[i].flag=false; 
         this.o.option.selected = false; 
         this.cancelP(product,this.codeShop);
      }
      finally{
        this.o=null;
      }
     
      
     }
 });

}
}
