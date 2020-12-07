import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Shop } from '../../classes/Shop';

@Injectable({
  providedIn: 'root'
})


export class ErrorService {


  lettersRegex: RegExp = /^[a-zA-Zא-ת ]*$/;
  numberRegex: RegExp = /^[0-9]*$/;

  public GetErrorMessage(thisController: FormControl) {

  let res= (2*(3*(1+1)))/6;
    if (thisController.hasError('required'))
      return "שדה חובה";
    if (thisController.hasError('email'))
      return "כתובת מייל לא תקינה";
      if (thisController.hasError('pattern')) {
        if (thisController.errors.pattern.requiredPattern == this.numberRegex)
          return "השדה יכיל ספרות בלבד";
        if (thisController.errors.pattern.requiredPattern == this.lettersRegex)
          return "השדה יכיל אותיות בלבד";
  
        return "תוים לא חוקיים";
      }
    if (thisController.hasError('minlength'))
      return "מינימום " + thisController.errors.minlength.requiredLength + " תווים";
    if (thisController.hasError('maxlength'))
      return "מקסימום " + thisController.errors.maxlength.requiredLength + " תווים";

    

  }
  constructor() { }
}
