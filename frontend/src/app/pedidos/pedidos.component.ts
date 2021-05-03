//import { FormsModule } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { NotifyAPIService } from '../notify-api.service';
 
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: Array<any>;
  hiddenCompleteRequests: boolean;

  constructor(private store: StoreService, private notify: NotifyAPIService) {    
    this.hiddenCompleteRequests = false;
  }

  ngOnInit(): void {
    this.store.getItems().subscribe(items => { this.pedidos = items; }); 
  }

  changeStatus(id: string, newStatus: boolean){
    this.store.completeRequest(id,newStatus);
    //this.notify.chamarAPI(newStatus); // lembrar de ativar depois
  }
  changeVisibility(){
    this.hiddenCompleteRequests = !this.hiddenCompleteRequests;
  }
  visible(status: boolean){
    if(this.hiddenCompleteRequests){
      return this.hiddenCompleteRequests&&!status;
    } else return true;
  }

  
}
