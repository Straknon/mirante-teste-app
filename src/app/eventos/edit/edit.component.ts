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
import { formatDate } from '@angular/common';
import { EventoDTO } from '../../models/EventoDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogGeneric } from '../dialog/dialog.component';

@Component({
  selector: 'app-edit.component',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit{
  form: FormGroup;
  carregando = false;

  constructor( private service: AppService ,private router: ActivatedRoute, private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      createdAt: [{ value: '', disabled: true }],
      updatedAt: [{ value: '', disabled: true }],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      local: ['', Validators.required],
      deleted: [false],
    });
  }

  ngOnInit(){
    //carregando
    this.carregando = true;

    let idStr = this.router.snapshot.paramMap.get('id');
    if(idStr !== null){
      let id:number = Number.parseInt(idStr);
      this.service.getById(id).subscribe(
        res => {
          console.log('Retorno buscar por id ', res);
          this.form.patchValue({
            id: res.id,
            createdAt:  res.createdAt,
            updatedAt: res.updatedAt,
            titulo: res.titulo,
            descricao: res.descricao,
            local: res.local,
            deleted: res.deleted
          });
          
          this.carregando = false;//parar carregando
          
        },
       err=> {
          console.error('Erro na requisição get by id', err);
          this.carregando = false;//parar carregando

          this.dialog.open(DialogGeneric, {
            data: {
              message: 'Erro ao recuperar dados do evento',
              state: 'Error',
              redirect: true
            }
          });
       });

    }
      
  } 
  
  formatarData(timestamp: string): string {
    return timestamp !==undefined && timestamp !== '' ? formatDate(timestamp, 'dd/MM/yyyy HH:mm', 'pt-BR') : '';
  }

  onSubmit() {
    if (this.form.valid) {
      //carregando
      this.carregando = true;

      let evento = new EventoDTO();
      evento.id = this. form.get('id')?.value
      evento.titulo = this. form.get('titulo')?.value
      evento.descricao = this. form.get('descricao')?.value
      evento.createdAt = this. form.get('createdAt')?.value
      evento.local = this. form.get('local')?.value
      evento.deleted = this. form.get('deleted')?.value
      // O valor de update eh alterado no back

      this.service.update(evento).subscribe(
        res=>{
          console.log('Retorno salvar edicao : ',  res)
          this.carregando = false;//parar carregando

          this.dialog.open(DialogGeneric, {
            data: {
              message: 'Evento atualizado com sucesso!',
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
              message: 'Erro ao atualizar evento',
              state: 'Error',
              redirect: true
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
