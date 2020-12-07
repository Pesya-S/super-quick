
import {Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from 'src/app/classes/Product';
import { Alias } from 'src/app/classes/Alias';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExtraAlias } from 'src/app/classes/ExtraAlias';
import { startWith, map } from 'rxjs/operators';
import { ProductAlias } from 'src/app/classes/ProductAlias';
import { ProductShop } from 'src/app/classes/ProductShop';
import { DbService } from 'src/app/servises/db/db.service';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';

@Component({
  selector: 'app-add-product-pop-up1',
  templateUrl: './add-product-pop-up1.component.html',
  styleUrls: ['./add-product-pop-up1.component.css']
})

export class AddProductPopUp1Component implements OnInit
 {
  @ViewChild('aliasInput',{static: false}) aliasInput: ElementRef<HTMLInputElement>;
  @ViewChild('img', { static: true }) img: ElementRef<HTMLImageElement>;
  base64textString:string;
  textForPicture:string="data:image/png;base64, ";

  arrAlias:Alias[]=[];
  aliasCtrl=new FormControl();
  filteredAlias: Observable<Alias[]>;
  selectedAlias:Alias[]=[];
  textP:string=""; 

  constructor(
    public dialogRef: MatDialogRef<AddProductPopUp1Component>, private db:DbService,
   public func:FunctionsService,
   public dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA)public data:{p:Product,aliases:Alias[],codeDep:number,dataResult:{ newProductAliases:ProductAlias[],b:boolean,changePicture:boolean};})
    {
 this.arrAlias=data.aliases;
      this.moveAlias();

    }

    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
             this.base64textString= btoa(binaryString);
             console.log(btoa(binaryString));
             this.img.nativeElement.src=this.textForPicture+ this.base64textString.toString();
            //  alert("befor: "+this.data.p.Src)
this.data.p.Src=this.textForPicture+ this.base64textString.toString();
this.data.dataResult.changePicture=true;
            //  alert("after: "+this.data.p.Src)
             
     }
     handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();
  
        reader.onload =this._handleReaderLoaded.bind(this);
  
        reader.readAsBinaryString(file);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
 this.img.nativeElement.src=this.data.p.Src;
  }



  moveAlias()
  {
     this.filteredAlias= this.aliasCtrl.valueChanges
     .pipe
     (
       startWith(''),
       map(a => a ? this._filterAlias(a) : this.arrAlias)
     );
   }
 
   private _filterAlias(value: string):Alias []
   {
     const filterValue = value;
     return this.arrAlias.filter(a =>a.TextAlias.includes(filterValue) === true);
   }

   addItem(value:string) : void
  {
    let e:Alias;
    e=(this.arrAlias.filter(p=>p.TextAlias==value)[0]);
    this.selectedAlias.push(e);
    this.aliasInput.nativeElement.value = '';
    this.aliasCtrl.setValue(null);
   let  pa:ProductAlias=new ProductAlias();
pa.CodeAlias=e.Code;
pa.Alias=e;
pa.CodeProduct=this.data.p.Code;
pa.Product=null;
 this.data.p.ProductAlias.push(pa);
 this.data.dataResult.newProductAliases.push(pa);
  }
  removeItem(x:any)
  {
    //alert("del");
    this.selectedAlias.splice(x,1);
  }
  findAndSelect()
  {
    let r=this.arrAlias.filter(a =>a.TextAlias.includes(this.textP));

 let pa:ProductAlias;
 let a:Alias;
 if(r.length>0&& r[0].TextAlias==this.textP)//r[0].TextAlias.startsWith(this.textP)&&r[0].TextAlias.endsWith(this.textP)
 { 
    a=r[0];
  //אם הכינוי כבר קיים, צריך רק לקשר למוצר
  pa=new ProductAlias();
      pa.CodeAlias=a.Code;
      pa.CodeProduct=this.data.p.Code;
      this.data.dataResult.newProductAliases.push(pa);
      pa.Alias=a;
      this.data.p.ProductAlias.push(pa);
 }
    else
    {
         //צריך להוסיף ת הכינוי וגם לקשר
         a=new Alias();
         a.IsMainCategory=false;
         a.IsPrivate=false;
         a.Parent=this.data.codeDep;
         a.TextAlias=this.textP;
         let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
         this.db.PostAlias(a).subscribe(x=>{
           a=<Alias>x; 
           pa=new ProductAlias();
           pa.CodeAlias=a.Code;
           pa.CodeProduct=this.data.p.Code;
           this.data.dataResult.newProductAliases.push(pa);
           pa.Alias=a;
           this.data.p.ProductAlias.push(pa);
           dref.close();});
    }

    //  this.addItem(a.TextAlias);
  }


}
