
import { Stand } from './Stand';
import { Connection } from './Connection';
import { Wall } from './Wall';
import { Getaway } from './Getaway';


export class Shop
{
Code:number  
NameShop: string

Walls:Wall[]
Stands:Stand[]
Connections:Connection[]
Getaways:Getaway[]
CodeGetaway:number;
}
