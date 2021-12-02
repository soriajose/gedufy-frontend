import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Curso} from '../interfaces/curso';
import {ToastController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  cursos: Curso[] = [];

  constructor(private storage: NativeStorage,
              public toastController: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  guardarCurso(curso: Curso) {

    const existe = this.cursos.find(item => item.id === curso.id);

    if (!existe) {
      this.cursos.unshift(curso); // para agregar en la primera posicion
      this.storage.setItem('favoritos', this.cursos);
    }
    this.presentToast('Agregado a favoritos');
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.getItem('favoritos');
    console.log(`favoritos`, favoritos);
    if (favoritos) {
      this.cursos = favoritos;
    }
  }

  borrarCurso(curso: Curso) {
    this.cursos = this.cursos.filter(item => item.id !== curso.id);
    this.storage.setItem('favoritos', this.cursos);
    this.presentToast('Eliminado de favoritos');
  }

  setEmailInBrowser(email: string) {
    sessionStorage.setItem('email', email);
  }

  getEmailInBrowser(): string {
    return sessionStorage.getItem('email');
  }

  removeEmailInBrowser() {
    sessionStorage.removeItem('email');
  }
}
