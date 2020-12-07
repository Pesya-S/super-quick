
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../../classes/Product';

import { Shop } from '../../classes/Shop';


/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-to-delete',
  templateUrl: 'to-delete.component.html',
  styleUrls: ['to-delete.component.css']
})
export class ToDeleteComponent {
constructor()
{
  
}
  ngOninit()
  {

  }
}