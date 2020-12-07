import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Product } from '../../../classes/Product';
import { DbService } from 'src/app/servises/db/db.service';
import { ProgresBarComponent } from '../../progres-bar/progres-bar.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FunctionsService } from 'src/app/servises/function/functions.service';




@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit
 {
  @ViewChild('img', { static: true }) 
  img: ElementRef<HTMLImageElement>;
  
    id:number
    arrProduct:Product[];
    arrAlias:string[];
    state:number=0;
      //constructor()
      constructor(private db:DbService,private r:Router,public func:FunctionsService,public dialog:MatDialog)
       { 
         this.id=1;
         let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
         this.db.getAllProduct().subscribe(
           
           x=>{
            this.arrProduct=<Product []>x;
         if(this.state==1)
         this.img.nativeElement.src=this.arrProduct[165].Src;        
         else this.state=2;  
         dref.close();        
          });


       }

  ngOnInit() {
    if(this.state==0)
    this.state=1;
    else if(this.state==2)
    this.img.nativeElement.src=this.arrProduct[165].Src;
  }

}
