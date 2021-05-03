import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import{AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})

 


export class ProdutosComponent implements OnInit {
  
  produto: any;
  produtosName: string;
  produtosDescription: string;
  produtosPrice: number;
  produtosType: boolean;
  alert:boolean=false;

 



  constructor(private produtosService : ProdutosService) { }

  ngOnInit(){
    this.produtosService.read_Produtos().subscribe(data => {
    this.produto = data.map(e => {
    return{
      id: e.payload.doc.id,
      isEdit: false,
      Name: e.payload.doc.data()['Name'],
      Description: e.payload.doc.data()['Description'],
      Price: e.payload.doc.data()['Price'],
      Type: e.payload.doc.data()['Type'],
    };
    })
    console.log(this.produto);
    });
    }
    CreateRecord(){
      let record = {};
      record['Name'] = this.produtosName;
      record['Description'] = this.produtosDescription;
      record['Price'] = this.produtosPrice;
      record['Type'] = this.produtosType;
      this.produtosService.create_NewProdutos(record).then(resp => {
        this.produtosName="";
        this.produtosDescription = "";
        this.produtosPrice = undefined;
        this.produtosType = undefined;
       
        console.log(resp);

      })
      .catch(error => {
        console.log(error);

      });
    }
    RemoveRecord(rowID) {
        this.produtosService.delete_Produtos(rowID);
    }
    EditRecord(record){
      record.isEdit = true;
      record.EditName = record.Name;
      record.EditDescription = record.Description;
      record.EditPrice = record.Price;
      record.EditType = record.Type;
    }
    UpdateRecord(recordRow){
      let record = {};
      record['Name']=recordRow.EditName;
      record['Description']= recordRow.EditDescription;
      record['Price']= recordRow.EditPrice;
      record['Type']= recordRow.EditType;
      this.produtosService.update_Produtos(recordRow.id, record);
      recordRow.isEdit = false;
    }

    
    
    
    
    


}
