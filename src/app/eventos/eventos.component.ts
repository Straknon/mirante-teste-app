
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { EventoDTO } from '../models/EventoDTO';
import { MatTableModule } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogGeneric } from './dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {
  form!: FormGroup;
  eventos: EventoDTO[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'local', 'descricao','createdAt','updatedAt','acao'];
  pageNumber: number = 0;
  totalItems: number = 0;
  pageSize: number = 5;

  firstSearch = false;
  carregando = false;

  constructor(private fb: FormBuilder, private service: AppService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: ['']
    });
  }

  showTable(): boolean {
    return this.firstSearch;
  }

  showNenhumEventoEncontrado(){
    return this.eventos === undefined || this.eventos === null || this.eventos.length === 0 && this.showTable();
  }

  showPaginator(){
    return this.eventos !== undefined && this.eventos !== null && this.eventos.length > 0;
  }

  onSubmit() {
    if (this.form.get('id')?.value !== undefined && this.form.get('id')?.value !== null && this.form.get('id')?.value !== '') {
      //carregando
      this.carregando = true;
      this.service.getById(this.form.get('id')?.value).subscribe(
        (valor) => {
          console.info('get id', valor);
          this.eventos = [valor];
          this.carregando = false; // parar carregando
          this.firstSearch = true;
          this.totalItems = 1;
        },
       (erro) => {
          console.warn('Erro na requisição get by id', erro);
          this.carregando = false;// parar carregando
          this.eventos = [];
          this.firstSearch = true; 
          this.totalItems = 0;
          this.dialog.open(DialogGeneric, {
            data: {
              message: 'Falha ao recuperar evento',
              state: 'Error',
              redirect : false
            }
          });
       }
      );
    }else{
      this.pageNumber = 0;
      this.loadData();
    }
  }

  novoEvento(){
    this.router.navigate(['eventos','new']);
    this.firstSearch = true;
  }

  formatarData(timestamp: string): string {
    return timestamp !==undefined && timestamp !== '' ? formatDate(timestamp, 'dd/MM/yyyy HH:mm', 'pt-BR') : '';
  }
  
  handlePaginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadData();
  }

  loadData(){
    this.carregando = true; // carregando
    this.service.getAll(this.pageNumber, this.pageSize, 'id', 'asc', false).subscribe(
      (valor) =>{
        this.eventos = valor.content;
        this.totalItems = valor.totalElements;
        console.log(valor);
        this.carregando = false;// parar carregando
        this.firstSearch = true; 
      },
      (erro)=>{
        console.error('Erro na requisição get all', erro);
        this.carregando = false;// parar carregando
        this.firstSearch = true; 
        this.dialog.open(DialogGeneric, {
          data: {
            message: 'Erro ao recuperar eventos',
            state: 'Error',
            redirect: false
          }
        });
      }
    );
  }

  edit(id: number){
    this.router.navigate(['eventos',id,'edit']);
    this.firstSearch = true;
  }
  
  view(id : number){
    this.router.navigate(['eventos',id]);
    this.firstSearch = true;
  }

  delete(id: number){
    this.service.delete(id).subscribe(
      res =>{
        console.log(res);
        this.loadData();
      },
      err=>{
        console.error('Erro ao deletar evento', err);
      }
    );
  }
}