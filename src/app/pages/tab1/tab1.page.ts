import {Component, OnInit} from '@angular/core';
import {Curso} from '../../interfaces/curso';
import {CursosService} from '../../services/cursos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  cursos: Curso[] = [];

  constructor(private cursosService: CursosService) {
  }

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(resp => {
      if (resp.status === 0) {
        this.cursos = resp.data;
      }
    });
  }

}
