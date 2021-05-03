import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { AngularFirestoreModule} from '@angular/fire/firestore';



@Component({
  selector: 'app-dashboard-produtos',
  templateUrl: './dashboard-produtos.component.html',
  styleUrls: ['./dashboard-produtos.component.css']
})

 


export class DashboardProdutosComponent implements OnInit {
  
  produto: any;
  produtosName: string;
  produtosDescription: string;
  produtosPrice: number;
  produtosType: boolean;
  SearchType= '';
  Type = '';
  SortDirection = 'asc';
  SortbyParam = '';

  constructor(private produtosService : ProdutosService) { }
  filterPost = '';
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
    
    onTypeFilter(){
      this.SearchType = this.Type;
    }
    onTypeFilterClear(){
      this.SearchType = '';
      this.Type = '';
    }
    onSortDirection() {
      if (this.SortDirection === 'desc') {
        this.SortDirection = 'asc';
      } else {
        this.SortDirection = 'desc';
      }
    }
    


}
