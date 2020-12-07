export class Square {
    constructor(private ctx: CanvasRenderingContext2D) {}
  
    draw(x: number, y: number, a: number,b: number,color:string) {
      this.ctx.strokeStyle =color;
      this.ctx.lineWidth   = 1;
      this.ctx.strokeRect( x,  y, a, b);
      this.ctx.strokeRect(x-6,y-6,a,b);
      this.ctx.beginPath();
      this.ctx.moveTo(x,y);
      this.ctx.lineTo(x-6,y-6);
     
      this.ctx.moveTo(x+a,y);
      this.ctx.lineTo(x-6+a,y-6);

      this.ctx.moveTo(x,y+b);
      this.ctx.lineTo(x-6,y-6+b);

      this.ctx.moveTo(x+a,y+b);
      this.ctx.lineTo(x-6+a,y-6+b);
      this.ctx.closePath();
this.ctx.stroke();
    }
  }