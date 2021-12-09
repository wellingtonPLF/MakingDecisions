import {Component, Input, OnInit} from '@angular/core';
import {Decision} from "../shared/models/Decision";
import {Usuario} from "../shared/models/Usuario";
import {UsuarioFirestoreService} from "../shared/service/usuario-firestore-service";
import {ActivatedRoute} from "@angular/router";
import {SessionStorageService} from "../shared/service/session-storage.service";
import {DecisaoFirestoreService} from "../shared/service/decisao-firestore.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {
  usuario?: Usuario;
  decisoes: Array<Decision> = new Array<Decision>();
  @Input() tokenId?: string;
  timeout: any = null;

  constructor(private rotaAtual: ActivatedRoute, private accountService: SessionStorageService,
              private usuarioService: UsuarioFirestoreService, private  deciaoService: DecisaoFirestoreService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if(this.tokenId != undefined){
      this.usuarioService.pesquisarPorId(this.tokenId).subscribe(
        it => {
          this.usuario = it
          if(it.decisoes != undefined){
            for(let d of it.decisoes){
                this.deciaoService.pesquisarPorId(d.id).subscribe(
                    result => this.decisoes.push(result)
                )
            }
          }
        }
      );
    }
    else{
      this.usuario = undefined;
      this.decisoes = new Array<Decision>();
    }
  }

  saveEdit(event: any, i: number) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value, i);
      }
    }, 300);
  }

  private executeListing(value: string, index: number) {
    if(value != '' && this.decisoes != undefined){
      if(this.decisoes.length != 0){
        const decisao = this.decisoes[index]
        this.deciaoService.pesquisarPorId(decisao.id).subscribe(
          it => {
              it.nome = value;
              this.deciaoService.atualizar(it).subscribe(
                result => console.log("Decisão Atualizada!")
              )
          }
        )
      }
    }
  }

  addDecisao(): void{
    const decisao = new Decision()
    decisao.nome = "New"
    /*this.deciaoService.getById(this.usuario?.id).subscribe(
      response => {
        decisao.usuario = response.ref
      }
    )*/
    this.deciaoService.inserir(decisao).subscribe(
      result => {
        this.usuarioService.pesquisarPorId(this.tokenId).subscribe(
            user => {
                user.decisoes?.push(result)
                this.usuarioService.atualizar(user).subscribe(
                  it => {
                    this.deciaoService.pesquisarPorId(result.id).subscribe(
                       resposta => {
                         this.decisoes.push(resposta)
                         console.log("Add")
                       }
                    )
                  }
                )
            }
        )
      }
    )
  }

  removerDecisao(index : number): void{
    this.deciaoService.remover(this.decisoes[index].id).subscribe(
      resposta =>{
        this.usuarioService.pesquisarPorId(this.tokenId).subscribe(
          result => {
            if(result.decisoes != undefined){
              result.decisoes.splice(index,1)
              this.decisoes.splice(index, 1)
              this.usuarioService.atualizar(result).subscribe(
                it => {
                  console.log("Remoção Feita!")
                }
              )
            }
          }
        )
      }
    )
  }
}
