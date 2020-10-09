import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){
    }

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24) : Observable<ProdutoDTO[]>{
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    findById(produto_id: string) : Observable<ProdutoDTO>{
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    getSmallImageFromBucket(id : string){
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.png`;
        return this.http.get(url, {responseType: 'blob'});
    }

    getImageFromBucket(id: string){
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.png`;
        return this.http.get(url, {responseType: 'blob'})
    }
}