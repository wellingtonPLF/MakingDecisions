import {Decision} from "./Decision";

export class Usuario{
  id?: string;
  nome?: string;
  password?: string;
  email?: string;
  decisoes?: Array<Decision>;

  constructor(id?: string, usuario: Usuario = {}) {
    this.id = id;
    this.nome = usuario.nome;
    this.password = usuario.password;
    this.email = usuario.email;
    this.decisoes = usuario.decisoes;
  }
}
