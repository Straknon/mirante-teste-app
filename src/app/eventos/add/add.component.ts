import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EventoDTO } from '../../models/EventoDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogGeneric } from '../dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add.component',
  standalone: true,
  imports: [MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  form: FormGroup;
  carregando = false;

  constructor( private service: AppService ,private router: ActivatedRoute, private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      local: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      //carregando
      this.carregando = true;
      
      let evento = new EventoDTO();
      evento.titulo = this. form.get('titulo')?.value
      evento.descricao = this. form.get('descricao')?.value
      evento.local = this. form.get('local')?.value
      // O valor de created e update eh alterado no back

      this.service.save(evento).subscribe(
        res=>{
          console.log('Retorno salvar edicao : ',  res)
          this.carregando = false;//parar carregando

          this.dialog.open(DialogGeneric, {
            data: {
              message: 'Evento salvo com sucesso!',
              state: 'Sucesso',
              redirect: true
            }
          });

        },
        err=> {
          console.error('Erro ao salvar', err);
          this.carregando = false;//parar carregando

          this.dialog.open(DialogGeneric, {
            data: {
              message: 'Erro ao salvar evento',
              state: 'Error',
              redirect : true
            }
          });
        }
      );
    }
  }


  disableButton() : boolean {
    return !this.form.valid;
  }
}