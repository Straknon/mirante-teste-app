import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-generic',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogGeneric {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; state: string; redirect: boolean },
    public dialogRef: MatDialogRef<DialogGeneric>,
     private router: Router
  ) {}

  fechar(): void {
    if(this.data.redirect === true){
        this.router.navigate(['eventos']);
    }
    this.dialogRef.close();
  }
}