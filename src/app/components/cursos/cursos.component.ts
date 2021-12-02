import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Curso} from '../../interfaces/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit, AfterViewInit {

  @Input() cursos: Curso[] = [];
  @Input() enFavoritos = false;

  constructor() { }

  ngOnInit() {
    console.log(this.cursos);
  }

  ngAfterViewInit(): void {
    console.log(this.cursos);
  }

}
