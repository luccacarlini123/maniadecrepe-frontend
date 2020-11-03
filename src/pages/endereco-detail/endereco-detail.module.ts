import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoDetailPage } from './endereco-detail';

@NgModule({
  declarations: [
    EnderecoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EnderecoDetailPage),
  ],
})
export class EnderecoDetailPageModule {}
