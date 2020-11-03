import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { PedidoShowDTO } from '../../models/pedido-show.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-pedido-detail',
  templateUrl: 'pedido-detail.html',
})
export class PedidoDetailPage {

  pedido: PedidoShowDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.loadImageUrls();
  }

  loadImageUrls(){
    for(var i=0;i<this.pedido.itens.length;i++){
      let produto = this.pedido.itens[i].produto;
      this.produtoService.getSmallImageFromBucket(produto.id)
        .subscribe(response => {
          produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produto.id}-small.png`;  
        },error=>{});
    }
  }
}
