

create database ShopWay
go
use ShopWay
go

--èáìàåú áñéñéåú 

create table Shop(
Code int identity (1,1) primary key
,NameShop  nvarchar(20) not null
,Password nvarchar(20) not null
,--CodeGetaway int  foreign key  references getaway(Code)  
 --
)
create table Alias
  (
 Code int identity(1,1) primary key
 ,TextAlias nvarchar(30) not null
  ,IsPrivate bit not null
  --,IsMainCategory bit not null
  ,Parent int foreign key  references Alias(Code) 
  ,Color nvarchar(50) 
 )

create table Product(
Code int identity(1,1) primary key
,Barcode nvarchar(20) not null
,CodeAlias int foreign key  references Alias(Code) --אילוץ נדרש
,Company nvarchar(20) 
,Size nvarchar(50)  
,Src nvarchar(max) 
)

create table Stand(
Code int identity(1,1) primary key 
,X1 float            not null    
,Y1 float			 not null
,X2  float			 not null
,Y2 float			 not null
,CodeShop  int foreign key  references Shop(Code)  	
,CodeAlias int foreign key  references Alias(Code) 	
--,I int not null
)
create table Shelf(
Code int identity(1,1) primary key
,CodeStand  int foreign key  references Stand(Code)  
,Num int  not null
,CodeAlias int foreign key  references Alias(Code) 
)

create table Getaway(
Code int identity (1,1) primary key
,X1 float   not null
,Y1 float   not null
,X2  float  not null
,Y2 float   not null
,CodeShop  int foreign key  references Shop(Code)  
--,I int not null
)
alter table shop add  CodeGetaway int  foreign key  references getaway(Code) 

create table Wall(
Code int identity (1,1) primary key
,X1 float    not null
,Y1 float	 not null
,X2 float	 not null
,Y2 float	 not null
,CodeShop  int foreign key  references Shop(Code) 
,CodeAlias int foreign key  references Alias(Code)  
--,I int not null
)

/*create table ProductShop --טבלה מיותרת
(
Code int identity(1,1) primary key
,CodeProduct  int foreign key  references Product(Code) 
,CodeShop int foreign key  references Shop(Code)   
,IsExist int  not null
--,I int not null
)*/

create table ProductShelf(--טבלת קישור, צריך אילוץ ייחודיות
Code int identity(1,1) primary key
,CodeProduct int foreign key  references product(Code) 	
,CodeShelf int foreign key  references Shelf(Code)	
constraint unq_shelf_product unique(CodeProduct,CodeShelf)
 ) 

 create table ProductAlias(--טבלת קישור, צריך אילוץ ייחודיות
Code int identity(1,1) primary key
,CodeProduct int foreign key  references Product(Code) 
,CodeAlias int foreign key  references Alias(Code) 	
constraint unq_alias_product unique(CodeProduct,codealias)
 ) 
 --éù äáãì áéï ÷ùú ùîçáøú 2 ð÷åãåú àå áéï îåöø ìð÷åãä
 create table Connection(--טבלת קישור, צריך אילוץ ייחודיות
 Code int identity(1,1) primary key
 ,CodeSource  int foreign key  references Getaway(Code) not null
 ,CodeDest int     not null
 ,Distance float   not null
 ,TypeDest int	   not null
 ,Nearest bit	   not null
 ,CodeShop int foreign key  references Shop(Code)  
 constraint unq_src_dest unique(codesource,codedest,typedest)
 --constraint checkExitCode  check (codeDest in (select code from getaways) or codedest in (select code from stand))
 )

 

  --פונקציות
--  go
-- create function calculateLength(@Xstart float,@Ystart float,@Xend float,@Yend float)
-- returns float
-- as
-- begin
-- declare @num float
-- select @num=(@Xstart-@Xend)*(@Xstart-@Xend)+(@Ystart-@Yend)*(@Ystart-@Yend)
-- select @num=SQRT(@num)
-- return @num
-- end

-- insert into Shop values('Example Shop')
-- insert into Wall values(1,0,0 ,0,9 ,1,0 1,9)
-- insert into Product values('1','choclate','taaman',3.4)
-- insert into Getaway values(1,1,1)
-- insert into Stand values(1,1,2,2,1,1)
-- insert into Shelf values(1,1)
-- insert into ProductShop values('1',1,1)
-- insert into ProductShelf values(1,1)
-- insert into ConnectionGetAway values(1,1,1,1)
-- insert into ConnectionStand values(1,1,1,1)

go
 create proc GetawayProcI(@codeShop int)
 as
 begin
 select *,  ROW_NUMBER() OVER(ORDER BY code ASC) AS I  from Getaway 
 where CodeShop=@codeShop
 end

 go
 create view ProductShop
 as
 select ROW_NUMBER() OVER(ORDER BY Shop.Code ASC) AS Code,Product.Code as 'CodeProduct', Shop.Code as 'CodeShop'
from Product
join ProductShelf on ProductShelf.CodeProduct=Product.Code
join Shelf on ProductShelf.CodeShelf=Shelf.Code
join Stand on Stand.Code=Shelf.CodeStand
join Shop on Stand.Codeshop=Shop.Code

--select * from productshop
/*
 exec GetawayProcI 1







 --שאילתה שעובדת, קישור בין מוצר לקוד חנות
select ProductShelf.Code as 'קוד קישור מוצר למדף' ,Product.Code as 'קוד מוצר',ProductShelf.CodeShelf as 'קוד מדף',stand.code as 'קוד עמודה',shop.code as 'קוד חנות',Alias.TextAlias as 'שם מוצר'
from product
join Alias on Alias.Code=Product.CodeAlias
join ProductShelf on ProductShelf.codeproduct=product.code
join Shelf on ProductShelf.CodeShelf=Shelf.Code
join stand on stand.Code=Shelf.CodeStand
join shop on stand.codeshop=shop.Code
order by ProductShelf.Code */