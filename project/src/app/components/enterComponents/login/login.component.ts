import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InvalidPasswordPopUpComponent } from '../invalid-password-pop-up/invalid-password-pop-up.component';
import { ErrorService } from '../../../servises/error/error.service';

import { RequrestResponse } from '../../../classes/RequestResponse';
import { DbService } from 'src/app/servises/db/db.service';
import { MessageComponent } from '../../message/message.component';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { FunctionsService } from 'src/app/servises/function/functions.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nameShop:string;
  textPassword:string="";
  
  password = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);

  loginForm: FormGroup = new FormGroup({
   password: this.password

  });
  Password: string = "";
  getErrorMessage(elementFormControlName: string) {
    
    let thisController: FormControl = (<FormControl>this[elementFormControlName]);
    return this.error.GetErrorMessage(thisController);

  }

  constructor(private router: Router, private error:ErrorService,private db:DbService,public dialog: MatDialog,public func:FunctionsService)
   {
    this.nameShop=db.getName(); 
   }

  ngOnInit() {
  }

  goToHome() {
    //alert("i am enter with the password " +this.textPassword);
   let r:RequrestResponse;
  //  post
  let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
  this.db.isTruePassword(this.textPassword).subscribe(x=>{
   r=  <RequrestResponse>x;
    if(r.Result==true)
    //alert(r.Message) 
    this.router.navigate(["ProductToShop"]);
    //this.nameShop
    else
    {
      this.openDialog("הי מנהל "," הזנת סיסמא שגויה, נסה שוב");
      this.textPassword="";
    }
dref.close()}); 
// // get
// this.db.isTruePassword(this.Password).subscribe(x=>{
//   r=  <RequrestResponse>x;
//    if(r.Result==true)
//    alert("home")
//    else
//    this.openDialog(r.Message,this.nameShop);
// }); 

}

  openDialog(title:string,message:string): void
   {
    const dialogRef = this.dialog.open(MessageComponent,
                                                                     {
                                                                      width: '40%',
                                                                      data: {title,message}
                                                                      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.nameShop = result;
      this.textPassword="";      
    });
  }
}