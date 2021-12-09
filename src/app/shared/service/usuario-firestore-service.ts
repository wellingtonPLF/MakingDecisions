import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Usuario} from "../models/Usuario";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Decision} from "../models/Decision";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class UsuarioFirestoreService {

  colecaoUsuarios: AngularFirestoreCollection<Usuario>;
  NOME_COLECAO = 'Usuario';

  constructor(private afs: AngularFirestore) {
    this.colecaoUsuarios = afs.collection(this.NOME_COLECAO);
  }

  listar(): Observable<Usuario[]> {
    return this.colecaoUsuarios.valueChanges({idField: 'id'});
  }

  inserir(usuario?: Usuario): Observable<any> {
    delete usuario?.id;
    return from(this.colecaoUsuarios.add(Object.assign({}, usuario)));
  }

  getDocumentById(id?: string): Observable<any> {
    return this.colecaoUsuarios.doc(id).get().pipe(map(document => document));
  }

  getUserByNome(usuario?: Usuario): Observable<any>{
    return this.afs.collection('Usuario',
        ref => ref.where('nome', '==', usuario?.nome)).get()
  }

  remover(id: string): Observable<void> {
    return from(this.colecaoUsuarios.doc(id).delete());
  }

  pesquisarPorId(id?: string): Observable<Usuario> {
    return this.colecaoUsuarios.doc(id).get().pipe(map(document => new Usuario(document.id, document.data())));
  }

  atualizar(usuario?: Usuario): Observable<void> {
    const id = usuario?.id;
    delete usuario?.id;
    return from(this.colecaoUsuarios.doc(id).update(Object.assign({}, usuario)));
  }
}
