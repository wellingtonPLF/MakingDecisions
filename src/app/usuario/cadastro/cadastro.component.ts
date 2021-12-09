import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {Router} from "@angular/router";
import {Usuario} from "../../shared/models/Usuario";
import {UsuarioFirestoreService} from "../../shared/service/usuario-firestore-service";
import {Decision} from "../../shared/models/Decision";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  usuario!: Usuario;

  constructor(private usuarioService: UsuarioFirestoreService,
              private roteador: Router, private accountService: SessionStorageService) {
    this.usuario = new Usuario()
    this.usuario.decisoes = new Array<Decision>()
  }

  ngOnInit(): void {
  }

  cadastrarUsuario(): void{
    try {
      this.usuarioService.inserir(this.usuario).subscribe(
        it => {
          this.roteador.navigate(['/login']);
        }
      )
    }
    catch (e){
      console.log("Dados em falta!")
    }
  }
}
