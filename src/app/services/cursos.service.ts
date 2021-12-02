import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDto} from '../interfaces/responseDto';
import {Inscripcion} from '../interfaces/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  // private base = '/assets/mocks';
  private base = 'http://localhost:8080';
  // private base = 'https://gedufy.ekeepoit.com';

  constructor(private httpClient: HttpClient) {
  }

  getCursos() {
    return this.httpClient.get<ResponseDto>(this.base + `/cursos`);
  }

  getCategorias() {
    return this.httpClient.get<ResponseDto>(`/assets/mocks/categorias.json`);
  }

  saveInscripcion(inscripcion: Inscripcion) {
    return this.httpClient.post<ResponseDto>(this.base + `/personas-cursos/inscripcion`, inscripcion);
  }

  getInscripciones(email: string) {
    return this.httpClient.get<ResponseDto>(this.base + `/personas-cursos/inscripciones/` + email);
  }
}
