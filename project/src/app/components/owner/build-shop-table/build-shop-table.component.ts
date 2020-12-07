import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Point } from 'src/app/classes/Point';
import { Shop } from 'src/app/classes/Shop';
import { Wall } from 'src/app/classes/Wall';
import { Stand } from 'src/app/classes/Stand';
import { Shelf } from 'src/app/classes/Shelf';
import { Getaway } from 'src/app/classes/Getaway';
import { Connection } from 'src/app/classes/Connection';
import { FunctionsService } from 'src/app/servises/function/functions.service';
import { I2Point } from 'src/app/classes/I2Point';

@Component({
  selector: 'app-build-shop-table',
  templateUrl: './build-shop-table.component.html',
  styleUrls: ['./build-shop-table.component.css']
})
export class BuildShopTableComponent implements OnInit {
  @ViewChild('tableH', { static: true }) tableH: ElementRef<HTMLTableElement>;
  arrColors:string[]=[]
  mat:number[][]=[];
sub:string;
shop:Shop;
p1:Point=new Point();
p2:Point=new Point();
i1Color=0;
i2Color=0;

  constructor(private func:FunctionsService) { 
    this.arrColors.push("white");
    this.arrColors.push("blue");
    this.arrColors.push("pink");
    this.arrColors.push("green");
    this.arrColors.push("black");
    this.arrColors.push("gray");
    for(let i:number=0; i<50; i++)
    {
      this.mat[i]=[];
      for(let j:number=0; j<50; j++)
      this.mat[i][j]=0;
    }
    this.p1.X=-1;
    this.p2.X=-1;
  }

  clickTd(x:number,y:number,event)
  {
    if(this.p1.X==-1)
    {
      this.i1Color=this.mat[x][y];
      this.p1.X=x;
      this.p1.Y=y;
    }
    else 
    {
      this.p2.X=x;
      this.p2.Y=y; 
      this.i2Color=this.mat[x][y];   
    }
      this.mat[x][y]=4;
  }

nearest:boolean=true;


addToSub()
{
  this.mat[this.p1.X][this.p1.Y]=this.i1Color;
  this.mat[this.p2.X][this.p2.Y]=this.i2Color;
  // ----------------הוספת קיר-------------------------------
  if(this.sub=='w')
  {
    // alert("i am going to add wall");
    this.mat[this.p1.X][this.p1.Y]=0;
    this.mat[this.p2.X][this.p2.Y]=0;
   let w:Wall=new Wall();
   w.Code=1;
   w.P1=this.p1;
   w.P2=this.p2;
   if(this.nearest==true)
   w.CodeAlias=100;
   else w.CodeAlias=null;
   w.Alias=null;
   this.shop.Walls.push(w);
   for(let i:number=this.p1.X; i<=this.p2.X; i++)
     for(let j:number=this.p1.Y; j<=this.p2.Y; j++)
       this.mat[i][j]=1;
   this.p1=new Point();
   this.p1.X=-1;
   this.p2=new Point(); 
   this.p2.X=-1;
  }
    // ----------------הוספת סטנד-------------------------------
   else if(this.sub=='s')
   {
    // alert("i am going to add stand");
    this.mat[this.p1.X][this.p1.Y]=0;
   this.mat[this.p2.X][this.p2.Y]=0;     
    let s:Stand=new Stand();
    s.Alias=null;
   s.CodeAlias=null;
    s.P1=this.p1;
    s.P2=this.p2;
    let shelves:Shelf[]=[];
    let numShelves=0;
    for(let i:number=0; i<=numShelves; i++)
    {
      shelves[i]=new Shelf();
      shelves[i].Alias=null;
     //  shelves[i].CodeAlias=<number><unknown>this.codeAlias;
      shelves[i].Num=i+1;
      shelves[i].ProductShelves=null;
    }
    s.Shelves=shelves;
    this.shop.Stands.push(s);
    for(let i:number=this.p1.X; i<=this.p2.X; i++)
      for(let j:number=this.p1.Y; j<=this.p2.Y; j++)
        this.mat[i][j]=2;
    this.p1=new Point();
    this.p1.X=-1;
    this.p2=new Point(); 
    this.p2.X=-1;
   }
     // ----------------הוספת נקודת גישה-------------------------------
   else if(this.sub=='g')
   {
    // alert("i am going to add getaway");
    this.mat[this.p1.X][this.p1.Y]=0;
    this.mat[this.p2.X][this.p2.Y]=0;
   let g:Getaway=new Getaway();
   g.Code=1;
   g.I=1;
   g.P1=this.p1;
   g.P2=this.p2;
   this.shop.Getaways.push(g);
   for(let i:number=this.p1.X; i<=this.p2.X; i++)
     for(let j:number=this.p1.Y; j<=this.p2.Y; j++)
       this.mat[i][j]=3;
   }





  // ----------------הוספת קשת-------------------------------
   else if(this.sub=='c')
   {
     let cDest:I2Point;
    //  alert("i am going to add connection. firs getaway then dest");
  let g1:Getaway;
  let g2:Getaway;
  let s:Stand;
  let w:Wall;
  let c:Connection=new Connection();
  let kind:string='?';
  for(let i:number=0; i<this.shop.Getaways.length; i++)
  {
    let a:Getaway=this.shop.Getaways[i];
    if(this.p1.X>=a.P1.X&&this.p1.X<=a.P2.X  &&this.p1.Y>=a.P1.Y&&this.p1.Y<=a.P2.Y)
   { g1=a;
    break; }
  }
  for(let i:number=0; i<this.shop.Getaways.length; i++)
  {
    let a:Getaway=this.shop.Getaways[i];
    if(this.p2.X>=a.P1.X&&this.p2.X<=a.P2.X  &&this.p2.Y>=a.P1.Y&&this.p2.Y<=a.P2.Y)
   { kind='g';
    g2=a;
    break; }
  }
  if(kind=='?')
for(let i:number=0; i<this.shop.Stands.length; i++)
  {
    let a:Stand=this.shop.Stands[i];
    if(this.p2.X>=a.P1.X&&this.p2.X<=a.P2.X  &&this.p2.Y>=a.P1.Y&&this.p2.Y<=a.P2.Y)
  { s=a;
    kind='s';
    break;}
  }
  if(kind=='?')
  for(let i:number=0; i<this.shop.Walls.length; i++)
    {
      let a:Wall=this.shop.Walls[i];
      alert("its wall code "+a.Code);   
      if(this.p2.X>=a.P1.X&&this.p2.X<=a.P2.X  &&this.p2.Y>=a.P1.Y&&this.p2.Y<=a.P2.Y)
    { w= a;
      kind='w';
      break;}
    }


  if(kind=='g')
  { c.CodeDest=g2.Code;
  c.TypeDest=1
cDest=g2;}
  else if(kind=='s')
  {c.CodeDest=s.Code;
  c.TypeDest=2;
cDest=s;}
else if(kind=='w')
{
  alert(w.Code);
  c.CodeDest=w.Code;
  c.TypeDest=0;
cDest=w;
}
  c.CodeSource=g1.Code;
  c.CodeShop=this.shop.Code;
  c.Distance=this.func.midDist(g1,cDest)
  c.Nearest=this.nearest;
  this.shop.Connections.push(c);
   }




   this.p1=new Point();
   this.p1.X=-1;
   this.p2=new Point(); 
   this.p2.X=-1;
   }

   MoveTd(x:number,y:number)
{
  let t= this.tableH.nativeElement;
  t.rows[x].style.border='red';
  let n=this.mat.length;
}
unMoveTd(x:number,y:number)
{
  let t= this.tableH.nativeElement
  t.rows[x].style.border='black'
}







     


  ngOnInit() {
  }

}
