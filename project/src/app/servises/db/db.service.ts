import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Product} from '../../classes/Product'
import {Shop} from '../../classes/Shop'
import { RequrestResponse } from '../../classes/RequestResponse';
import { Point } from '../../classes/Point';
import { Alias } from '../../classes/Alias';
import { Connection } from 'src/app/classes/Connection';
import { Observable } from 'rxjs';
import { ProductShop } from 'src/app/classes/ProductShop';
import { ProductAlias } from 'src/app/classes/ProductAlias';
import { ProductShelf } from 'src/app/classes/ProductShelf';

@Injectable({
  providedIn: 'root'
})
export class DbService
 {

  codeShop:number
  shop:Shop;
  // basicPath="https://localhost"; 
  basicPath="http://localhost:49847"; 

  
  constructor(private http:HttpClient)
  { 
  }
  //shop
  setShop(s:Shop)
  {
  this.shop=s;
  }
  getShop():Shop
  {
    if(this.shop==null)
    return this.getAllShop()[0]
    else
      return this.shop;
  }
  getName()
  {
    if(this.shop!=null)
      return this.shop.NameShop;
  }
  addShop(s:Shop,textPassword:string)
  {
  let r:  RequrestResponse =new RequrestResponse();
r.Message="save shop";
r.Result=true;
let data:object[]=[];
data.push(s);
let str:String =textPassword;
data.push(str);
r.Data=data;
    return this.http.post(this.basicPath+"/api/shop/PostShopBasic",r);
  }
  addShop1(s:Shop)
  {
    return this.http.post(this.basicPath+"/api/shop/InsertShop1",s);
  }
  addShop2(c:Connection[])
  {
   let r: RequrestResponse =new RequrestResponse();
   r.Data=c;
   r.Message="save my connections";
   r.Result=true;
    return this.http.post(this.basicPath+"/api/shop/InsertShop2",r);
  }
  getAllShop()
  {
    return this.http.get(this.basicPath+"/api/shop/GetShopList");   
  }
  isTruePassword(pasword:string)
  { 
    if(this.shop==null)
      return;
    let arrRequest:Array<string>=[];
    arrRequest[0]=pasword;
    let s:string=this.shop.Code.toString();
    arrRequest[1]=this.shop.Code.toString();
    let request:RequrestResponse=new RequrestResponse();
    request.Data=arrRequest;
    request.Message="can i enter";
    request.Result=true;
    return this.http.post(this.basicPath+"/api/shop/PostAllow",request);
  }

  // product
  getAllProduct()
  {
    return this.http.get(this.basicPath+"/api/product/GetProductList");                      
  }
  GetExtraAliasList( code:number)
  {
    return this.http.get(this.basicPath+"/api/product/GetExtraAliasList?code="+code);                      
  }
  GeAliasList()
  {
    return this.http.get(this.basicPath+"/api/product/GetAliasList");                      
  }
  getAllDepartment()
  {
    return this.http.get(this.basicPath+"/api/product/GetDepartmentList");                      
  }
  GetProdcutsShop(code: number) {
    return this.http.get(this.basicPath+"/api/product/GetProdcutsShop?code="+code)
  }

  addProduct(p:Product)
  {
    return this.http.post(this.basicPath+"/api/product",p);
  }
  addAlias(alias:Alias)
  {
    //debugger;
    return this.http.post(this.basicPath+"/api/product/addAlias",alias);
  }
  saveProductsShop(ToAddProductShelves:ProductShelf[],ToAddProductAliases:ProductAlias[], ToUpdateProductcts:Product[],codeShop:number,ToUpdateProductShelf:ProductShelf[],ToDeleteProductShop:ProductShop[])
  {
    let request:RequrestResponse=new RequrestResponse();
    let arrRequest:Array<object>=[];
    arrRequest[0]=ToAddProductShelves;
    arrRequest[1]=ToAddProductAliases;

    arrRequest[2]=ToUpdateProductcts;
    let n:Number=codeShop;
    arrRequest[3]=n;
    arrRequest[4]=ToUpdateProductShelf;
    arrRequest[5]=ToDeleteProductShop;
    request.Data=arrRequest;
    request.Message="save my products";
    request.Result=true;
    return this.http.post(this.basicPath+"/api/product/SaveProductsShop",request); 
  }   

  PostAlias(a: Alias) {
    return this.http.post(this.basicPath+"/api/product/PostAlias",a);
  }
// ------------------------------------------------------------------------------------------------------------------------
  // way
  GetMap(s:Shop)
  {
// עובד אבל לא מחזיר נתונים
      // this.http.get(this.basicPath+"/api/Way/GetMap", {
      //   params: {
      //     code: ''+s.Code,
      //   },
      //   observe: 'response'
      // })
      // .toPromise()
      // .then(response => {
      //   console.log(response);
      // })
      // .catch(console.log);



    //to do: ללא קוד חנות
    return this.http.get(this.basicPath+"/api/Way/GetMap?code="+s.Code);
  }


  ComputeWay(selectedProduct: number[],pStart:Point,endCash:Boolean)
  {
    let request:RequrestResponse=new RequrestResponse();
    let arrRequest:Array<object>=[];
    arrRequest[0]=selectedProduct;
    arrRequest[1]=pStart;
    let n:Number=this.shop.Code;
    arrRequest[2]=n;
    arrRequest[3]=endCash;
    request.Data=arrRequest;
    request.Message="give me please the way";
    request.Result=true;
    return this.http.post(this.basicPath+"/api/Way/PostWay",request); 
  }

  getWithParams()
  {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('projectid', "PROJECT");
  //   debugger;
  //   let params1 = new HttpParams().set("nameParam",parameter);
  //  return this.http.get(this.path+"/api/Manager/Get1", { headers: headers, params: params1 });
  }
  postFile(fileToUpload: RequrestResponse)
   {

    var url = this.basicPath+"/api/Shop/PostXml"
// const formData: FormData = new FormData();
//   formData.append('fileKey', fileToUpload, fileToUpload.name);
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json'
// });
    return this.http.post(url,fileToUpload);
}

/*postFile(fileToUpload: File) {
  const endpoint = 'your-destination-url';
  const formData: FormData = new FormData();
  return this.httpClient
    .post(endpoint, formData, { headers: yourHeadersConfig })
    .map(() => { return true; })
    .catch((e) => this.handleError(e));
}*/
getStands()
{
  let request:RequrestResponse=new RequrestResponse();
  
   let x:number=this.shop.Code;
    // debugger;
  
  request.Data=(x).toString;
  request.Message="give me the stnads of this shop";
  request.Result=true;
  return this.http.post(this.basicPath+"/api/shop/GetStands",this.shop.Code)
}
  }
  