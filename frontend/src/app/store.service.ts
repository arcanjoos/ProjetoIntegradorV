import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  tasksCollection: AngularFirestoreCollection<any>;
  userDoc: AngularFirestoreDocument<any>;
  tasks: Observable<any[]>;
  taskRequest: any [] = [];

  constructor(private store: AngularFirestore) {
    this.tasksCollection = this.store.collection('pedido', ref => ref.orderBy('data', "desc").limit(30));

    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(tarefasCollection => {
        return tarefasCollection.map(tarefa => {
          const tarefaData = tarefa.payload.doc.data() as any;
          tarefaData.id = tarefa.payload.doc.id;
          tarefaData.data = new Date(tarefaData.data * 1000);
          return tarefaData;
        });
      }),
      map(tarefas => {
        tarefas.map(item => {
          this.getUserData(item.idCliente).then(clienteDoc => {
            var cliente = clienteDoc as any;
            item.nomeCliente = cliente.nome;
            item.telefone = cliente.telefone;
            item.endereco = cliente.endereco;
          });
        })
        return tarefas;
      })
    );
  }

  getItems() {
    return this.tasks;
  }

  completeRequest(id: string, newStatus: boolean) {
    this.store.collection('pedido').doc(id).update({ "finalizado": newStatus });
  }

  getUserData(id: string) {
    return this.store
      .collection("usuario")
      .doc(id)
      .ref.get()
      .then(function (doc) {
        return doc.data();
      });
  }
}

