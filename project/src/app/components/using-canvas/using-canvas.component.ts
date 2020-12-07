import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Square } from '../../classes/Square';
import { Shop } from '../../classes/Shop';
import { Wall } from '../../classes/Wall';
import { Point } from '../../classes/Point';
import { Stand } from '../../classes/Stand';
import { Product } from 'src/app/classes/Product';
import { NgModel } from '@angular/forms';
import { Goal } from '../../classes/Goal';
import { DbService } from 'src/app/servises/db/db.service';
import { FunctionsService } from 'src/app/servises/function/functions.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MessageComponent } from '../message/message.component';
import { Alias } from 'src/app/classes/Alias';
import { ProgresBarComponent } from '../progres-bar/progres-bar.component';



@Component({
  selector: 'app-using-canvas',
  templateUrl: './using-canvas.component.html',
  styleUrls: ['./using-canvas.component.css']
})
export class UsingCanvasComponent implements OnInit
 {
  @Input()
  canvasInputProduct:Product;
  @ViewChild('canvas', { static: true })   canvas: ElementRef<HTMLCanvasElement>;
  @Output() onSelectPoint:EventEmitter<Point>=new EventEmitter<Point>();
  ctx: CanvasRenderingContext2D;
  //mul:number=window.innerWidth/100+3
  mul=window.innerWidth/100+3;
  pStart:Point=new Point();
selectedProduct:Product[]=[];
IsStart:boolean=false;
IsRestart:boolean=false;
 constructor(public func:FunctionsService, private db:DbService,private functions:FunctionsService,public dialog: MatDialog)
{
 let arrProduct:Product[]=[];
 let dref:MatDialogRef<ProgresBarComponent>;
  dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
 this.db.getAllProduct().subscribe(
    x=>{arrProduct=<Product []>x;
    this.selectedProduct[0]=arrProduct[1];
    this.selectedProduct[1]=arrProduct[24];
    this.selectedProduct[2]=arrProduct[32];
    this.selectedProduct[3]=arrProduct[45];
    this.selectedProduct[4]=arrProduct[57];
    this.selectedProduct[5]=(arrProduct[63]);
    this.selectedProduct[6]=(arrProduct[70]);
    this.selectedProduct[7]=(arrProduct[73]);
    this.selectedProduct[8]=(arrProduct[77]);
    dref.close();});


   let arrShop:Shop[]=[];
   if(db.getShop()==null)
   {
    let dref:MatDialogRef<ProgresBarComponent>;
    dref=  this.func.openDialog(this.dialog,30,10,ProgresBarComponent,null,true);
    this.db.getAllShop().subscribe(
      x=>{arrShop=<Shop []>x;
      db.setShop(arrShop[0]);
      this.shop=arrShop[0];
      this.drawShop();
      dref.close();});
   }
   else
   {
    this.IsStart=true;
   }


}
  ngOnInit()
  {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if(this.IsStart)
    {
      this.drawShop();
    }
    var myBoard=  document.getElementById("myBoard")
    // var canvas=document.getElementById("imgCanvas");
    // canvas.setAttribute("width", "this.mul*100");
    // להגדיר טופ ולפט
  }

drawShop()
{
  let s:Shop=this.db.getShop();
  if(s.Walls.length==0)
  {
    this.openDialog("לא נמצאו נתוני חנות לתצוגה",
    " אין באפשרותינו להציג לך את מפת החנות היות ומנהל החנות לא הזין את נתוני החנות");
    return;
  }
  let pMax:Point=new Point();
  pMax=this.functions.maxPoint(s.Walls);
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
         let p=this.functions.mid2Point(p1,p2);
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

restart()
{
  this.drawShop();
  this.pStart=new Point();
  this.codeProducts=[];
  this.codeStands=[];
}


fun()
{

}

findProducts()
{
  let product:Product;
  let shop:Shop=this.db.getShop();
  let stand:Stand;
  for(let i:number=0; i<this.selectedProduct.length; i++)
  {
    product=this.selectedProduct[i];
    stand=shop.Stands.filter(a=>a.Shelves.filter(b=>b.ProductShelves.filter(c=>c.CodeProduct==this.selectedProduct[i].Code)[0])[0])[0];
    let place:Point=this.functions.midPoint(stand);
    this.drawIcon(place.X*this.mul,place.Y*this.mul,product.Alias.TextAlias,stand.Code,product.Code);
  }
}shop:Shop=this.db.getShop()

findProduct(p:Product)
{
   let stand=this.shop.Stands.filter(a=>a.Shelves.filter(b=>b.ProductShelves.filter(c=>c.CodeProduct==p.Code)[0])[0])[0];
   let point:Point=this.functions.midPoint(stand);
  let str:string="this.drawIcon("+point.X*this.mul+","+point.Y*this.mul+","+p.Alias.TextAlias+","+stand.Code+")";
this.drawIcon(point.X*this.mul,point.Y*this.mul,p.Alias.TextAlias,stand.Code,p.Code);
}

codeStands:number[]=[];
codeProducts:number[]=[];
drawIcon(x: number, y: number,text:string,codeStand:number,codeProduct:number)
 {
   //debugger;
   let numPinProduct=this.codeProducts.filter(x=>x==codeProduct).length;
   if(numPinProduct>0)
   return;
  let numPinStand=   this.codeStands.filter(x=>x==codeStand).length;
  x=x+numPinStand*this.mul;
  let base_image=new Image();
  if(numPinStand==0)
  {
    base_image.src = './assets/icon/Color.png';
base_image.onclick=null;
    let c:CanvasRenderingContext2D=this.ctx;
base_image.onload=function(){
    //debugger;
      c.drawImage(base_image,y, x,base_image.width/5,base_image.height/5);
  }
  }

 // setTimeout(this.setIcon,20);
 // base_image.onclick= "fun()";
  this.ctx.fillStyle='black';
  this.ctx.font=""+this.mul*0.8+'px Guttman Hatzvi';
  this.ctx.fillText(text,y,x);
  this.ctx.fillStyle='black';
  this.codeStands.push(codeStand);
  this.codeProducts.push(codeProduct);
  // this.ctx.strokeText("קופה",x,y,200);
}
// setIcon()
// {
//   alert("set icon");
//   this.ctx.drawImage(this.base_image,this.y, this.x,this.base_image.width/20,this.base_image.height/20);
// }

/*
// לא צריך
animate(): void {
  this.findProducts();
  // this.ctx.fillStyle = 'blue';
  // const square = new Square(this.ctx);
  // // x-from left, y- from top, w-width, h-height
  // square.draw(100,1,25,1000,"rgb(26, 133, 26)");
}*/
draw(e){
  let rect = this.canvas.nativeElement.getBoundingClientRect(); 
  let p:Point=new Point();
  p.X=e.clientX-rect.left;
  p.Y=e.clientY-rect.top;
var posy = Math.round((e.clientX-rect.left)/this.mul) ;
var posx =Math.round((e.clientY-rect.top)/this.mul) ;
var imageData:ImageData=this.ctx.getImageData(p.X,p.Y,p.X+1,p.Y+1)
// alert(imageData.data.length+"  אורך מערך")
if(imageData.data[0]==255)
{
this.openDialog("בחרת נקודת התחלה"," במיקום "+"("+posx+  "," + posy+")" );
this.ctx.fillStyle = "#000000";
this.ctx.fillRect (p.X, p.Y, 1, 1);
let base_image = new Image();
base_image.src = './assets/icon/man.png';
base_image.onclick=null;
let c=this.ctx;
base_image.onload=function()
{
  c.drawImage(base_image,p.X,p.Y,base_image.width,base_image.height);
}
this.pStart.X=posx;
this.pStart.Y=posy;
this.onSelectPoint.emit(this.pStart);
}}

deleteIcon(e)
{
this.ctx.getLineDash()
}

drawPath(Coordinates:Goal[])
 {
  //  if(this.IsRestart==true)
  //  this.restart();
  //  else
  //  this.IsRestart=true;

  this.ctx.beginPath();
   this.ctx.strokeStyle ="rgb(108, 109, 108)";
   this.ctx.lineWidth   =1;
    this.ctx.moveTo(Coordinates[0].midPoint.Y*this.mul,Coordinates[0].midPoint.X*this.mul);

   for (let i =1; i < Coordinates.length; i++)
    {
    const element = Coordinates[i];
    if(element!=undefined&&(element.kind=='g'||element.kind=='p'||i== Coordinates.length-1))
    {
    //  this.ctx.strokeStyle ="rgb(108, 109, 108)";

 
    // if(this.ctx.isPointInPath(element.midPoint.Y*this.mul,element.midPoint.X*this.mul))
    // {
      
    //   this.ctx.lineTo(element.midPoint.Y*this.mul-7,element.midPoint.X*this.mul-7);
    //   this.ctx.stroke();
    //   this.ctx.moveTo(element.midPoint.Y*this.mul-7,element.midPoint.X*this.mul-7);
    // }
    
    // else
    // {

    //   this.ctx.lineTo(element.midPoint.Y*this.mul,element.midPoint.X*this.mul);
    //   this.ctx.stroke();
    //   this.ctx.moveTo(element.midPoint.Y*this.mul,element.midPoint.X*this.mul);
    // }

 

      this.ctx.lineTo(element.midPoint.Y*this.mul,element.midPoint.X*this.mul);
      this.ctx.stroke();
      this.ctx.moveTo(element.midPoint.Y*this.mul,element.midPoint.X*this.mul);
    }
  }
this.ctx.beginPath();
  // פסים לסטנדים
  this.ctx.strokeStyle ="rgb(216, 216, 216)";  
  let p1:Point=new Point(); let p2:Point=new Point();let p3:Point;
  p1.X=Coordinates[0].midPoint.X//*this.mul;
  p2.X=Coordinates[0].midPoint.X//*this.mul;
  p1.Y=Coordinates[0].midPoint.Y//*this.mul;
  p2.Y=Coordinates[0].midPoint.Y//*this.mul;
  let i2:number;
  let element:Goal;
  for (let i =1; i < Coordinates.length; i++)
  {
    element = Coordinates[i];
    while(element!=undefined&&element.kind=='g')
    {   
        p1=element.midPoint;
        i++;
        element = Coordinates[i];
    }
    i2=i;
    element = Coordinates[i];
    while(element!=undefined&&element.kind!='g')
    {   
      i++;
      element = Coordinates[i];
    }
    if(element==undefined) return;
    p2=element.midPoint;
    p3=this.functions.mid2Point(p1,p2)
    for (let i3 =i2; i3 < i; i3++)
    {
      if(Coordinates[i3].kind=='s')
      {this.ctx.moveTo(Coordinates[i3].midPoint.Y*this.mul,Coordinates[i3].midPoint.X*this.mul);   
      this.ctx.lineTo(p3.Y*this.mul,p3.X*this.mul);
      this.ctx.stroke(); }     
    }
  }
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