import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/classes/Product';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatIconModule} from '@angular/material/icon';
import {Square} from '../../../classes/Square';
import{Shop}from '../../../classes/Shop';
import{Point}from '../../../classes/Point';
import { Wall } from '../../../classes/Wall';
import { Stand } from '../../../classes/Stand';
import { DbService } from '../../../servises/db/db.service';
import { FunctionsService } from '../../../servises/function/functions.service';
import { RequrestResponse } from 'src/app/classes/RequestResponse';
import { MessageComponent } from '../../message/message.component';


@Component({
  selector: 'app-add-product-pop-up2',
  templateUrl: './add-product-pop-up2.component.html',
  styleUrls: ['./add-product-pop-up2.component.css']
})

export class AddProductPopUp2Component implements OnInit {

  @ViewChild('canvas', { static: true })   canvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private db:DbService,private func:FunctionsService,
    public dialog:MatDialog,
    public dialogRef: MatDialogRef<AddProductPopUp2Component>,
    @Inject(MAT_DIALOG_DATA) public data:{product:Product,mat:number[][],numStand:number})
    {
    }
  

    onNoClick(): void {
    
    this.dialogRef.close();
  }  
  
  ctx: CanvasRenderingContext2D;
  mul:number=20;
  clickPoint:Point;
  disChooseStand:boolean=true;
 s:Shop=this.db.getShop();
  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawShop();
    this.findProduct(this.data.product);

  }


  drawShop()
  {
    let s=this.db.getShop();
    if(s.Walls.length==0)
  {
    this.func.openDialogMessage("לא נמצאו נתוני חנות לתצוגה",
    " אין באפשרותינו להציג לך את מפת החנות היות  ולא הזנת את נתוני החנות",this.dialog);
    return;
  }
  let pMax:Point=new Point();
  pMax=this.func.maxPoint(s.Walls);
  this.ctx.fillStyle = "rgb(255, 255, 255)";
  this.ctx.fillRect (0, 0 , pMax.Y*this.mul,pMax.X*this.mul);
  //drow walls:
  // ------------------
  this.ctx.fillStyle = "rgb(185, 185, 183)";
  let ws:Wall[]=s.Walls;
  for(let i:number=0; i<ws.length; i++)
  {
    let wal:Wall=ws[i];

    let p1:Point=wal.P1;
    let p2:Point=wal.P2;
    let h=(p2.X-p1.X+1)*this.mul;
    let w=(p2.Y-p1.Y+1)*this.mul;

    let squre:Square=new Square(this.ctx);
  let color:string="rgb(185, 185, 183)"
      if(wal!=undefined&&wal.Alias!=undefined&&wal.Alias.Color!=null&&wal.Alias.TextAlias=="cash")
      {
        this.ctx.fillStyle = wal.Alias.Color;
        this.ctx.fillRect ( p1.Y*this.mul,p1.X*this.mul,w , h);
         color=wal.Alias.Color;
         squre.draw(p1.Y*this.mul,p1.X*this.mul, w,h,"rgb(185, 185, 183)");
         let p=this.func.mid2Point(p1,p2);
         p.X=p.X*this.mul; p.Y=p.Y*this.mul;
         this.ctx.fillStyle='black'; 
         this.ctx.font='11px Guttman Yad-Brush';
         this.ctx.textAlign="center";
        //  this.ctx.direction="rtl";
         this.ctx.fillText("קופה",p.Y,p.X,200);
         this.ctx.fillStyle='black';
        //  this.ctx.strokeText("קופה",p.X,p.Y,200);
         this.ctx.fillStyle = "rgb(185, 185, 183)";
      } 
  else   this.ctx.fillRect (p1.Y*this.mul,p1.X*this.mul,w , h);
  squre.draw(p1.Y*this.mul,p1.X*this.mul, w,h,"rgb(185, 185, 183)");
  }

  //drow stands
  // ------------------
  // this.ctx.fillStyle = "rgb(146, 146, 146)";
  for(let i:number=0; i<s.Stands.length; i++)
  {
    let st:Stand=s.Stands[i];
    let p1:Point=st.P1;
    let p2:Point=st.P2;
    let h=(p2.X-p1.X+1)*this.mul;
    let w=(p2.Y-p1.Y+1)*this.mul;
    try
    {
         this.ctx.fillStyle = s.Stands[i].Alias.Color; 
    }
    catch
    {
      this.ctx.fillStyle =  "rgb(146, 146, 146)";
    }
    this.ctx.fillRect (p1.Y*this.mul,p1.X*this.mul, w,h );
    // 3d
    let squre:Square=new Square(this.ctx);
    squre.draw(p1.Y*this.mul,p1.X*this.mul, w,h,"rgb(192, 192, 192)");
    // stroke
    this.ctx.strokeStyle ="rgb(192, 192, 192)";
    this.ctx.lineWidth   =1;
    this.ctx.strokeRect(p1.Y*this.mul,p1.X*this.mul, w,h);
    }
  }
  findProduct(p:Product)
  {
    try
    {
      let shop=this.db.getShop();
     let stand=shop.Stands.filter(a=>a.Shelves.filter(b=>b.ProductShelves.filter(c=>c.CodeProduct==p.Code)[0])[0])[0];
     let point:Point=this.func.midPoint(stand);
  this.drawIcon(point);    
  this.data.numStand=stand.Code;
  this.disChooseStand=false;
    }
    catch
    {
this.disChooseStand=true;
    }

  }
  
//אירוע לחיצה על קונס
  draw(e){
    let rect = this.canvas.nativeElement.getBoundingClientRect(); 
  var posx = (e.clientX-rect.left)/this.mul;

  var posy = (e.clientY-rect.top)/this.mul;
  var imageData:ImageData=this.ctx.getImageData(posx*this.mul,posy*this.mul,posx*this.mul+1,posy*this.mul+1)
  this.ctx.fillStyle = "#000000";
  this.ctx.fillRect (posx*this.mul, posy*this.mul, 1, 1);
  this.clickPoint=new Point();
  this.clickPoint.X=Math.round( posy);
  this.clickPoint.Y=Math.round(posx);
this.findStandByPoint(this.clickPoint)
}
drawIcon(point:Point)
{
  //debugger;
  let base_image = new Image();
  base_image.src = './assets/icon/iconSuper.png';
  let c=this.ctx;
  let m=this.mul;
  base_image.onload=function()
  {
    c.drawImage(base_image,point.Y*m,point.X*m,base_image.width/20,base_image.height/20);
  }
}

  findStandByPoint(point:Point )
{
 
let n:number= this.data.mat[point.X][point.Y];
if(n%10!=2)
this.func.openDialogMessage("הנקודה לא חוקית",
"לחץ שוב על הסטנד של המוצר",this.dialog)
else
{
  this.data.numStand=Math.round(n/100);
  this.func.openDialogMessage(" בחרת לשים את " + this.data.product.Alias.TextAlias+" בסטנד בקוד "+this.data.numStand,"באפשרותך לשנות את מיקום המוצר באמצעות לחיצה נוספת על סטנד אחר"
,this.dialog );
 this.drawIcon(point);
 this.disChooseStand=false;
}
}
}
