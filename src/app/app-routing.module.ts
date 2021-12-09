import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {LoginComponent} from "./usuario/login/login.component";
import {CadastroComponent} from "./usuario/cadastro/cadastro.component";

const routes: Routes = [
  {
    path: '',
    component: MainScreenComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
