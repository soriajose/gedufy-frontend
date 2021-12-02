import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacto } from '../interfaces/contacto';
import { ResponseDto } from '../interfaces/responseDto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private httpClient: HttpClient) { }

  postContacto(contacto: Contacto){
    return this.httpClient.post<ResponseDto>('http://localhost:8080/contactos', contacto);
  }


}
