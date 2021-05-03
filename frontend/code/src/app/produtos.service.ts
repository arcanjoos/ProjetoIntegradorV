import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private firestore: AngularFirestore
  ) { }

/* create_NewProdutos : Cria um novo registro na coleção especificada usando o método add */
create_NewProdutos(record){
  return this.firestore.collection('produtos').add(record);
}
/*read_Produtos: Chama o método snapshotChanges , que obterá registros e também será registrado para receber atualizações */
read_Produtos(){
  return this.firestore.collection('produtos').snapshotChanges();
}
/*update_Produtos : atualiza o registro pegando o ID e chamando o método de atualização */
update_Produtos(recordID,record) {
  this.firestore.doc('produtos/' + recordID).update(record);
}
/*delete_Produtos : chama o método de exclusão  ao registrar o ID*/
delete_Produtos(record_id) {
  this.firestore.doc('produtos/' + record_id).delete();
  }
}