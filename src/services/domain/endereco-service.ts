import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { EnderecoDTO } from "../../models/endereco.dto";

@Injectable()
export class EnderecoService{

    constructor(public http: HttpClient){}

    findEnderecoByCliente() : Observable<EnderecoDTO[]>{
        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.baseUrl}/enderecos`);
    }

    findEnderecoById(id:string) : Observable<EnderecoDTO>{
        return this.http.get<EnderecoDTO>(`${API_CONFIG.baseUrl}/enderecos/${id}`);
    }

    update(endereco: EnderecoDTO) : Observable<any> {
        return this.http.put<any>(`${API_CONFIG.baseUrl}/enderecos`, endereco);
    }

    insert(endereco:EnderecoDTO) : Observable<any> {
        return this.http.post<any>(`${API_CONFIG.baseUrl}/enderecos`, endereco);
    }
}