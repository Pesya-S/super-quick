import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private r:Router) { }

  ngOnInit() {
  }
  goHome(){
  this.r.navigate(["home"]);
  }
  addNewShop(){
    this.r.navigate(["AddShop"])
  }
}

