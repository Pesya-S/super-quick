import { Injectable } from '@angular/core';
import { I2Point } from 'src/app/classes/I2Point';
import { Point } from 'src/app/classes/Point';
import { Wall } from 'src/app/classes/Wall';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MessageComponent } from 'src/app/components/message/message.component';
import { Getaway } from 'src/app/classes/Getaway';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  midDist(g1: Getaway, cDest: I2Point): Number {
    let p1=this.midPoint(g1);
    let p2=this.midPoint(cDest);
    return this.distance(p1,p2);
  }
distance(p1:Point,p2:Point):number
{
 let d= (p1.X - p2.X) * (p1.X - p2.X) + (p1.Y - p2.Y) * (p1.Y - p2.Y);
 d=Math.sqrt(d);
 return d;
}

  constructor() { }

  midPoint(i:I2Point):Point
  {
    let p:Point=new Point();
   p.Y=(i.P1.Y+i.P2.Y)/2;
   p.X= (i.P1.X+i.P2.X)/2;
   return p;
  }
  mid2Point(p1:Point,p2:Point):Point
  {
    let p:Point=new Point();
   p.Y=(p1.Y+p2.Y)/2;
   p.X= (p1.X+p2.X)/2;
   return p;
  }
  maxPoint(Walls: Wall[]): Point {
    let p:Point=new Point();p.X=-1;p.Y=-1;
    Walls.forEach(element => {
     p.X= element.P2.X>p.X?element.P2.X:p.X;
     p.Y= element.P2.Y>p.Y?element.P2.Y:p.Y;    
    });
    return p;
  }
  openDialog(dialog:MatDialog, widthDialog: number, heightDialog: number, componentToOpen: any, data: any, disableClose: boolean): any {

    const dialogRef = dialog.open(componentToOpen, {
      // disableClose: disableClose,
      disableClose:false,
      width: widthDialog + '%',
      height: heightDialog + '%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      return result;
    });
    return dialogRef;
  }
  openDialogMessage(header:string,message:string,dialog:MatDialog): void
  {
   const dialogRef = dialog.open(MessageComponent,
                                                                    {
                                                                     width: '50%',
                                                                     data: {header,message}
                                                                     });
 
   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
   });
 }

}
