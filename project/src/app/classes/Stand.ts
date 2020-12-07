import { Point } from './Point';
import { Shelf } from './Shelf';
import { Alias } from './Alias';
import { I2Point } from './I2Point';

export class Stand implements I2Point
{
Code:number
P1:Point
P2:Point
CodeShop:number
CodeAlias:number
Alias:Alias;
Shelves:Shelf[];
} 