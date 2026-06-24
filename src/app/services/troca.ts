import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Troca } from '../models/troca-model';

@Injectable({
    providedIn: 'root'
})
export class TrocaService{
    private apiUrl = 'http://localhost:3000/trocas';

    constructor(private http: HttpClient){}

    solicitarTroca(troca: Troca): Observable<Troca>{
        return this.http.post<Troca>(this.apiUrl, troca);
    }

    listarTrocas(): Observable<Troca[]> {
        return this.http.get<Troca[]>(this.apiUrl);
    }

    atualizarStatus(id: number, status: string): Observable<Troca> {
        return this.http.patch<Troca>(`${this.apiUrl}/${id}`, {status});
    }
}