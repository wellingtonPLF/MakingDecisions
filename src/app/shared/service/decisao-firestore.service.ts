import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Decision} from "../models/Decision";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class DecisaoFirestoreService {

  colecaoDecisions: AngularFirestoreCollection<Decision>;
  NOME_COLECAO = 'Decision';

  constructor(private afs: AngularFirestore) {
    this.colecaoDecisions = afs.collection(this.NOME_COLECAO);
  }

  listar(): Observable<Decision[]> {
    return this.colecaoDecisions.valueChanges({idField: 'id'});
  }

  inserir(decision: Decision): Observable<any> {
    delete decision.id;
    //delete decision.usuario;
    return from(this.colecaoDecisions.add(Object.assign({}, decision)))
  }

  getById(id?: string): Observable<any> {
    return this.colecaoDecisions.doc(id).get().pipe(map(document => document));
  }

  remover(id?: string): Observable<void> {
    return from(this.colecaoDecisions.doc(id).delete());
  }

  pesquisarPorId(id?: string): Observable<Decision> {
    return this.colecaoDecisions.doc(id).get().pipe(map(document =>
      new Decision(document.id, document.data())));
  }

  atualizar(decision?: Decision): Observable<void> {
    const id = decision?.id;
    delete decision?.id;
    return from(this.colecaoDecisions.doc(id).update(Object.assign({}, decision)));
  }
}
