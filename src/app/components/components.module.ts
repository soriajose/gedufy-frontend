import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CursosComponent} from './cursos/cursos.component';
import {IonicModule} from '@ionic/angular';
import {CursoComponent} from './curso/curso.component';
import {HeaderComponent} from './header/header.component';



@NgModule({
  declarations: [
    CursosComponent,
    CursoComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CursosComponent,
    CursoComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
