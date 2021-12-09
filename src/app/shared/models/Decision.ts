import {Usuario} from "./Usuario";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

export class Decision{
  id?: string;
  nome?: string;
  //usuario?: Usuario;

  constructor(id?: string, decision: Decision = {}) {
    this.id = id;
    this.nome = decision.nome;
    //this.usuario = decision.usuario;
  }
}
