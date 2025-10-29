import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventoDTO } from '../models/EventoDTO';
import { Page } from '../models/Page';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private consultaApiUrl = environment.url_api + '/events';

    constructor(
        private http: HttpClient
    ) { }

    save(ent: EventoDTO): Observable<Map<String, String>> {
        return this.http.post<Map<String, String>>(this.consultaApiUrl, ent);
    }

    update(ent: EventoDTO): Observable<Map<String, String>> {
        return this.http.put<Map<String, String>>(this.consultaApiUrl + '/' + ent.id, ent);
    }

    delete(id: number): Observable<Map<String, String>> {
        return this.http.delete<Map<String, String>>(this.consultaApiUrl + '/' + id);
    }

    getAll(pageNumber?: number, pageSize?: number, pageSortBy?: string, searchDirection?: string, searchDeleted?: boolean): Observable<Page<EventoDTO>> {
        let params = new HttpParams();

        if (pageNumber !== undefined && pageNumber !== null) {
            params = params.set('page', pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            params = params.set('size', pageSize);
        }
        if (pageSortBy !== undefined && pageSortBy !== null) {
            params = params.set('sortBy', pageSortBy);
        }
        if (searchDirection !== undefined && searchDirection !== null) {
            params = params.set('direction', searchDirection);
        }
        if (searchDeleted !== undefined && searchDeleted !== null) {
            params = params.set('deleted', searchDeleted);
        }

        return this.http
            .get<Page<EventoDTO>>(this.consultaApiUrl, { params })
            .pipe(tap(_ => this.log('Eventos recebidos com sucesso!', 'success')));
    }

    
    getById(id: number): Observable<EventoDTO> {
        return this.http.get<EventoDTO>(this.consultaApiUrl + '/' + id);
    }

    private log(message: string, type: string) {
        console.log(type + ': ' + message);
    }

}