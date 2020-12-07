import { Alias } from './Alias';
import { ProductAlias } from './ProductAlias';

 export class Product
 {
 Code:number;
  Barcode:      string  ;
 CodeAlias  :     number;  
  Company:      string;  
Weight :    string;
Src:string;
  Alias:Alias;
  ProductAlias:ProductAlias[];
  flag:boolean;

constructor()
{
    this.flag=false;
}
 } 