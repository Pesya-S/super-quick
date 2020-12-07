
import {Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Product } from '../../../classes/Product';
import { Alias } from '../../../classes/Alias';
import { ErrorService } from '../../../servises/error/error.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ExtraAlias } from 'src/app/classes/ExtraAlias';
import { startWith, map } from 'rxjs/operators';
import { ProductAlias } from 'src/app/classes/ProductAlias';
import { DbService } from 'src/app/servises/db/db.service';
import { P } from '@angular/cdk/keycodes';
import { MessageComponent } from '../../message/message.component';
import { RequrestResponse } from 'src/app/classes/RequestResponse';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 p:Product=new Product();
 barcdoeCtrl=new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(15),Validators.pattern(this.error.numberRegex)]);
 productNameCtrl=new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(100)]);
 companyCtrl=new FormControl('',[Validators.required, Validators.maxLength(20),Validators.pattern(this.error.lettersRegex)]);
  weightCtrl=new FormControl('',[Validators.required, Validators.pattern(this.error.numberRegex)]);
  srcCtrl=new FormControl('',[Validators.required]);
  add_productForm:FormGroup=new FormGroup({
    barcdoeCtrl:this.barcdoeCtrl,
     productNameCtrl: this.productNameCtrl,
     companyCtrl: this.companyCtrl,
     weightCtrl:this.weightCtrl,
     srcCtrl:this.srcCtrl
   });
   base64textString:string;
textForPicture:string="data:image/png;base64, ";
@ViewChild('img', { static: true }) img: ElementRef<HTMLImageElement>;


  getErrorMessage(elementFormControlName: string)
   {  
    let thisController: FormControl = (<FormControl>this[elementFormControlName]);
    return this.error.GetErrorMessage(thisController);
  }

 constructor( private db:DbService,private error:ErrorService,
  public dialogRef: MatDialogRef<AddProductComponent>,
  public dialog:MatDialog,
  public func:FunctionsService,
    @Inject(MAT_DIALOG_DATA) 
  public data: {Dep:Alias,p:Product}
    ) 
  {
     this.p.Code=0;   
    this.p.Barcode="";
    this.p.Alias=new Alias();
    this.p.Alias.TextAlias="";
    this.p.Alias.Parent=data.Dep.Code;
    this.p.Company="";
    this.p.Weight="";
    this.p.Src="";
    }

   ngOnInit() {}

   handleFileSelect(evt)
   {
    var files = evt.target.files;
    var file = files[0];
  if (files && file)
  {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
         console.log(btoa(binaryString));
         this.img.nativeElement.src=this.textForPicture+ this.base64textString.toString();
         this.p.Src=this.textForPicture+ this.base64textString.toString();
         
 }
   saveProduct()
 {
  // debugger;
    // this.p.Code=1;
    this.p.Alias.IsMainCategory=false;
    // this.p.Alias.Parent=this.data.Dep.Code;
    let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
    this.db.addProduct(this.p).subscribe(x=>{
       this.openDialog("הוספת המוצר הושלמה"," המוצר "+this.p.Alias.TextAlias+" נשמר בהצלחה "+" אם תרצה להוסיפו לחנותך, תצטרך להגדיר את מיקומו במפת החנות   ",<Product>(<RequrestResponse>x).Data);
      dref.close(); });  
   // debugger;
    // this.data.p=this.p;
}
 onNoClick(): void {
  this.dialogRef.close();
}
 openDialog(header:string,message:string,r:Product): void
 {
  const dialogRef = this.dialog.open(MessageComponent,
                                                                   {
                                                                    width: '50%',
                                                                    data: {header,message}
                                                                    });

  dialogRef.afterClosed().subscribe(result => {
    this.p=r;
    this.dialogRef.close(this.p);
    console.log('The dialog was closed');
  });
}
 }

 
