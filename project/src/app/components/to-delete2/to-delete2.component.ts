import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/Product';

@Component({
  selector: 'app-to-delete2',
  templateUrl: './to-delete2.component.html',
  styleUrls: ['./to-delete2.component.css']
})
export class ToDelete2Component implements OnInit {

  constructor() { }
productsList:string[]=["Milk", "Bread", "Cheese"];
errortext:string="";
addMe:string='';
  ngOnInit() {
  }
  addItem()
  {  
        if (!this.addMe) {return;}
        if (this.productsList.indexOf(this.addMe) == -1) {
           this.productsList;
        } else {
           this.errortext = "The item is already in your shopping list.";
        }
  }
  removeItem(x:any)
  {
    this.errortext='';
    this.productsList.splice(x,1);
  }

}


/*
<script>
var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {
    $scope.products = ["Milk", "Bread", "Cheese"];
    
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        if ($scope.products.indexOf($scope.addMe) == -1) {
            $scope.products.push($scope.addMe);
        } else {
            $scope.errortext = "The item is already in your shopping list.";
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        $scope.products.splice(x, 1);
    }
});
</script>
*/