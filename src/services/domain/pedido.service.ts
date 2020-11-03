import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { PedidoShowDTO } from "../../models/pedido-show.dto";
import { PedidoDTO } from "../../models/pedido.dto";

@Injectable()
export class PedidoService{

    constructor(public http: HttpClient){
    }

    insert(obj: PedidoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    findPedidosByCliente() : Observable<PedidoShowDTO>{
        return this.http.get<PedidoShowDTO>(`${API_CONFIG.baseUrl}/pedidos`);
    }

    findPedidoById(id: string) : Observable<PedidoShowDTO>{
        return this.http.get<PedidoShowDTO>(`${API_CONFIG.baseUrl}/pedidos/${id}`);
    }
}