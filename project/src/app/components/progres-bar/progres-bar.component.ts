import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatTabsModule, MatButtonModule, MatProgressBar, MatProgressBarModule } from "@angular/material";

@Component({
  selector: 'app-progres-bar',
  templateUrl: './progres-bar.component.html',
  styleUrls: ['./progres-bar.component.css']
})
export class ProgresBarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProgresBarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      // this.textToShow=data.textToShow;
    }

  ngOnInit(): void {
  }


}
