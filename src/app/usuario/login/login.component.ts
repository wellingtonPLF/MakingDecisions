import { Component, OnInit } from '@angular/core';
import {UsuarioFirestoreService} from "../../shared/service/usuario-firestore-service";
import {Usuario} from "../../shared/models/Usuario";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario!: Usuario;

  constructor(private usuarioService: UsuarioFirestoreService,
              private accountService: SessionStorageService,
              private roteador: Router) {
  }

  ngOnInit(): void {
    this.usuario = new Usuario()
  }

  validarUsuario(): void{
    if(this.usuario.nome != undefined && this.usuario.password != undefined){
      this.usuarioService.getUserByNome(this.usuario).subscribe(
        it => {
          try {
            const id = it.docs[0].id
            this.usuarioService.pesquisarPorId(id).subscribe(
              result => {
                if (result.password == this.usuario.password){
                  this.accountService.setToken(id);
                  this.roteador.navigate(['']);
                }
                else{
                  this.invalidUser()
                }
              }
            )
          }
          catch (e){
            this.invalidUser()
          }
        }
      )
    }
  }

  invalidUser(): void{
    this.usuario.nome = ''
    this.usuario.password = ''
    console.log('Usuario não cadastrado!')
  }
}
