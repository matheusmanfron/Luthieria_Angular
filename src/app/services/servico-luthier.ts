import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Servico } from "../models/servico-model";

@Injectable({
    providedIn: 'root'
})
export class ServicoService{
    private apiUrl = 'http://localhost:3000/servicos';

    constructor(private http: HttpClient) {}

    solicitarConserto(servico: Servico): Observable<Servico>{
        return this.http.post<Servico>(this.apiUrl, servico);
    }

    listarServicos(): Observable<Servico[]> {
        return this.http.get<Servico[]>(this.apiUrl);
    }

    listarChamadosAbertos(): Observable<Servico[]>{
        return this.http.get<Servico[]>(`${this.apiUrl}?status=solicitado`);
    }

    atualizarServico(id: number, servico: Partial<Servico>): Observable<Servico>{
        return this.http.patch<Servico>(`${this.apiUrl}/${id}`, servico);
    }

    finalzarServico(id: number): Observable<Servico>{
        return this.http.patch<Servico>(`${this.apiUrl}/${id}`, {
            status: 'finalizado'
        });
    }
}