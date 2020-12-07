import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-invalid-password-pop-up',
  templateUrl: './invalid-password-pop-up.component.html',
  styleUrls: ['./invalid-password-pop-up.component.css']
})
export class InvalidPasswordPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InvalidPasswordPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{nameSHop:string,message:string}
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
