import { CartItem } from "./cart-item";
import { ClienteShowDTO } from "./cliente-show.dto";
import { EnderecoDTO } from "./endereco.dto";
import { PagamentoDTO } from "./pagamento.dto";

export class PedidoShowDTO{
    id: string;
    instante: string;
    pagamento: PagamentoDTO;
    cliente: ClienteShowDTO;
    enderecoDeEntrega: EnderecoDTO;
    itens: CartItem[];
}