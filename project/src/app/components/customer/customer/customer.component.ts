import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../classes/Product';
import { UsingCanvasComponent } from '../../using-canvas/using-canvas.component';
import { Goal } from '../../../classes/Goal';
import { Point } from 'src/app/classes/Point';
import { BuyingComponent } from '../buying/buying.component';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit
 {
  @ViewChild(UsingCanvasComponent,null) child: UsingCanvasComponent;
  @ViewChild(BuyingComponent,null) childBuying: BuyingComponent;
  
  selectedProducts:Product[]=[];
  product:Product;
  constructor() { }

  ngOnInit() {
       
  }
  inputProduct(e:Product)
  {
this.child.findProduct(e);
  }
  inputPoint(e:Point)
  {
this.childBuying.setPstart(e);
  }
  
  sendPath(coordinates:Goal[])
  {
    this.child.drawPath(coordinates);
  }
  restart()
  {
    this.child.restart();
  }

}
