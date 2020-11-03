import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoService } from '../../services/domain/pedido.service';
import { PedidoDetailPage } from './pedido-detail';

@NgModule({
  declarations: [
    PedidoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoDetailPage),
  ],
  providers:[
    PedidoService
  ]
})
export class PedidoDetailPageModule {}
