import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../classes/Product';
import { DbService } from 'src/app/servises/db/db.service';

@Component({
  selector: 'app-to-delete3',
  templateUrl: './to-delete3.component.html',
  styleUrls: ['./to-delete3.component.css']
})
export class ToDelete3Component implements OnInit
 {
  @ViewChild('img', { static: true }) 
  img: ElementRef<HTMLImageElement>;
textForPicture:string="data:image/png;base64, ";

  constructor(private db:DbService) { }

  ngOnInit() {
  }
  private base64textString:String="";
  
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
            this.img.nativeElement.src=this.textForPicture+ this.base64textString.toString();
            
    }




 
}


