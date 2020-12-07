import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSliderModule } from '@angular/material/slider';
import { Shop } from '../../../classes/Shop';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorService } from '../../../servises/error/error.service';
import { RequrestResponse } from '../../../classes/RequestResponse';
import { DbService } from 'src/app/servises/db/db.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MessageComponent } from '../../message/message.component';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';
import { Route } from '@angular/compiler/src/core';
//import { filter } from 'minimatch';
//import * as $ from 'jquery/dist/jquery.min.js';



@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})


export class AddShopComponent implements OnInit
{
  fileToUpload: File = null;
id:number
s:Shop=new Shop();
arrShop:Shop[]=[];
arrFiltered:Shop[]=[];
xml:string="";
nameShop:string="";
  textPassword:string="";
  nameshopCtrl=new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(25)])
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
  xmlCtrl=new FormControl('', [Validators.required]);
addShopForm: FormGroup = new FormGroup({
   xmlCtrl:this.xmlCtrl
  });

  
  getErrorMessage(elementFormControlName: string) {
    
    let thisController: FormControl = (<FormControl>this[elementFormControlName]);
    return this.error.GetErrorMessage(thisController);

  }



  constructor(public router:Router, private a:ActivatedRoute,private db:DbService,private error:ErrorService,public dialog:MatDialog,public func:FunctionsService) {
   // this.s.Code=1;
    this.id=a.snapshot.params["id"];
    if(this.id==undefined)
    this.id=0;
    let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
    this.db.getAllShop().subscribe(x=>this.arrShop=<Shop []>x);
    this.s.NameShop="";
    this.arrFiltered=this.arrShop;
    this.db.getAllShop().subscribe(x=>{this.arrFiltered=<Shop []>x; dref.close()});
   //this.fun();
    

  //  addShopForum:FormGroup 
   }
 /*  fun()
  {
    debugger;
    $("#automplete1" ).autocomplete({
      source: this.arrFiltered
   });
  //$("#automplete1").
  }*/

  ngOnInit() {
  }
saveShop()
{
  this.uploadFileToActivity();
  this.s.Code=1;
  let r:RequrestResponse;
  // this.db.addShop(this.s,this.textPassword).subscribe(x=>{
  //   r=<RequrestResponse>x; 
  //   this.s=<Shop>r.Data;
  // this.openDialog(" הוספת החנות הושלמה "," :קוד החנות החדשה הוא "+this.s.Code);
  // });
}
onKey(event:any)
 { // without type info
  this.arrFiltered=this.arrShop.filter(x=>x.NameShop.indexOf(this.s.NameShop)!=-1)
} 
  reader:FileReader  = new FileReader();


handleFileInput(files: FileList) {

  this.fileToUpload = files.item(0);
this.readFile();
// var future = new Promise((resolve, reject) => {
//   this.reader.addEventListener("load", function () 
//   {
//     resolve(this.result);
//   }, false);
//   this.reader.addEventListener("error", function (event) {
//     reject(event);
//   }, false);

//   this.reader.readAsDataURL(this.fileToUpload);
// });
}
//  arrayBuffer:any;array:any;binaryString:any;
st:String;
readFile()
{
  
  var arrayBuffer,array,binaryString:any;
  let dref:MatDialogRef<ProgresBarComponent>;
dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
  this.reader.onload = function()
   {

  arrayBuffer = this.result;
  array = new Uint8Array(arrayBuffer);
  //binaryString = String.fromCharCode.apply(null, array);
  localStorage.setItem("byteArray",array);
  dref.close();
  }

this.reader.readAsArrayBuffer(this.fileToUpload);
   this.st=localStorage.getItem("byteArray").toString(); 
}

uploadFileToActivity()
 {
 /*
debugger;
var fileByteArray = [];
this.reader.readAsArrayBuffer(this.fileToUpload);
this.reader.onloadend  = function (evt) {
alert("read");
     let arrayBuffer:any = this.result;
      let   array:any = new Uint8Array(arrayBuffer);
     for (var i = 0; i < array.length; i++) {
         fileByteArray.push(array[i]);
      }
  }
*/
// מאסתי

//return future;
// מה זה


   let  r:RequrestResponse=new RequrestResponse();

    r.Message="dd";
    r.Result=true;
  
    r.Data=this.st;
    let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
    this.db.postFile(r).subscribe((x:any)=>{r=<RequrestResponse>x;
       dref.close();
       if(r.Result==false) 
       this.func.openDialogMessage("שגיאת הוספה",r.Message,this.dialog);
      else
      {
        this.func.openDialogMessage("ההוספה הושלמה",r.Message,this.dialog);
        this.router.navigate(["ProductToShop"]);
      }
      });  
      



/*
debugger;
 (data => {
 let r : RequrestResponse =<RequrestResponse>data;
 debugger;
alert(r.Data);
    // do something, if upload success
    }, error => {
      console.log(error);
    });*/
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
