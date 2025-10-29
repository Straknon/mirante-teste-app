import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, formatDate } from '@angular/common';
import { DialogGeneric } from '../dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-view.component',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatDividerModule,CommonModule, MatDialogModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit{
  id?:number ;
  createdAt?:number ;
  updatedAt?:number ;
  titulo?:string ;
  descricao?:string ;
  local?:string ;
  deleted?:boolean ;

  carregando = false;

  constructor( private service: AppService ,private router: ActivatedRoute, private dialog: MatDialog) {}
  ngOnInit(){
    //carregando
    this.carregando = true;
    let idStr = this.router.snapshot.paramMap.get('id');

    if(idStr !== null){
      let id:number = Number.parseInt(idStr);
      this.service.getById(id).subscribe(
        res => {
          console.log('Retorno buscar por id ', res);
          this.id= res.id;
          this.createdAt=  res.createdAt;
          this.updatedAt= res.updatedAt;
          this.titulo= res.titulo;
          this.descricao= res.descricao;
          this.local= res.local;
          this.deleted= res.deleted;
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
  
  formatarData(timestamp?: number): string {
    return timestamp !==undefined  ? formatDate(timestamp, 'dd/MM/yyyy HH:mm', 'pt-BR') : '';
  }
}
