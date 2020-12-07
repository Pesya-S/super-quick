import { Component, OnInit, Input } from '@angular/core';
import{Stand} from '../../../classes/Stand'
import { Getaway } from '../../../classes/Getaway';
import { Connection } from '../../../classes/Connection';
import { nearer } from 'q';
import { Point } from 'src/app/classes/Point';
import { MatDialog } from '@angular/material';
import { MessageComponent } from '../../message/message.component';

@Component({
  selector: 'app-add-stand',
  templateUrl: './add-stand.component.html',
  styleUrls: ['./add-stand.component.css']
})
export class AddStandComponent implements OnInit
 {
   
  connections:Connection[];
  numShelves:number=0;
  numConnection:number=0;
stand:Stand=new Stand();


  constructor(public dialog:MatDialog) { 
    this.connections=[];
    this.stand.P1=new Point();
    this.stand.P2=new Point();

  }

  ngOnInit() {
  }

  i:number=0;
AddConnection(g:Getaway,nearest:boolean):Connection
{
 let c:Connection=new Connection();
 c.CodeDest=this.stand.Code;
 c.CodeShop=g.CodeShop;
 c.CodeSource=g.Code;
 c.Distance=0;
 c.Nearest=nearest;
 c.TypeDest=2;
 this.connections.push(c);
 return c;
}
setStand(s:Stand)
{
  this.stand=s;
this.openDialog("מצאתי סטנד","("+s.P1.X+","+s.P2.Y+")");
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
