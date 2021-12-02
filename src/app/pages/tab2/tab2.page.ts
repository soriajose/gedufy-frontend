import {Component, OnInit, ViewChild} from '@angular/core';
import {Curso} from '../../interfaces/curso';
import {IonSegment} from '@ionic/angular';
import {CursosService} from '../../services/cursos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  cursos: Curso[] = [];
  categorias: any[] = [];
  cursosFilter: Curso[] = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild(IonSegment, null) segment: IonSegment;

  constructor(private cursosService: CursosService) {
  }

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(resp => {
      if (resp.status === 0) {
        this.cursos = resp.data;
        this.getCategorias();
      }
    });
  }

  getCategorias() {
    this.cursosService.getCategorias().subscribe(resp => {
      if (resp.status === 0) {
        this.categorias = resp.data;
        this.segment.value = this.categorias[0].nombre;

        // obtener los cursos de la categoria seleccionada
        this.getCursosByCategoria(this.categorias[0].nombre);
      }
    });
  }

  getCursosByCategoria(categoria: string) {
    console.log(`categoria: ` + categoria);
    this.cursosFilter = this.cursos.filter(item => item.categoria === categoria);
    console.log(`this.cursosFilter`, this.cursosFilter);
  }

  cambioCategoria(event) {
    this.getCursosByCategoria(event.detail.value);
  }

}
