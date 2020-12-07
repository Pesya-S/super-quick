import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvalidPasswordPopUpComponent } from '../enterComponents/invalid-password-pop-up/invalid-password-pop-up.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InvalidPasswordPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{title:string,message:string}
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
