import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoShowDTO } from '../../models/pedido-show.dto';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  pedidos: PedidoShowDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public pedidoService: PedidoService) {
  }

  ionViewDidLoad() {
    this.pedidoService.findPedidosByCliente()
      .subscribe(response => {
        this.pedidos = response['content'];
      }, error => {});
  }

  nextPage(pedido: PedidoShowDTO){
    this.navCtrl.push('PedidoDetailPage', {pedido: pedido});
  }
}