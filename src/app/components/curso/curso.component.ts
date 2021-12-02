import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Curso} from '../../interfaces/curso';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from '../../services/data-local.service';
import {Inscripcion} from '../../interfaces/inscripcion';
import {CursosService} from '../../services/cursos.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit, AfterViewInit {

  @Input() curso: Curso;
  @Input() nro: number;
  @Input() enFavoritos;

  constructor(private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private iab: InAppBrowser,
              private dataLocalService: DataLocalService,
              private cursosService: CursosService,
              public alertController: AlertController,
              private toastController: ToastController) {
  }

  ngOnInit() {
    console.log(this.curso);
  }

  ngAfterViewInit(): void {
    console.log(this.curso);
  }

  abrirCurso() {
    const browser = this.iab.create(this.curso.url, '_system');
  }

  async lanzarMenu() {

    let borrarBtn;
    if (this.enFavoritos) {
      borrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar Favorito');
          this.dataLocalService.borrarCurso(this.curso);
        }
      };
    } else {
      borrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarCurso(this.curso);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');
            this.socialSharing.share(
              this.curso.nombre,
              null, // file
              this.curso.url
            );
          }
        },
        borrarBtn,
        {
          text: 'Aprendizaje',
          icon: 'book',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Aprendizaje');
            // levantar popup
            this.presentAlertMostrarInput();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  async presentAlertMostrarInput() {
    // si existe en el storage lo tomo, sino lo guardo
    if (this.dataLocalService.getEmailInBrowser()) {
      this.saveInscripcion(this.dataLocalService.getEmailInBrowser());
    } else {
      const alert = await this.alertController.create({
        header: 'Input',
        subHeader: 'Ingrese su email',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('cancel');
            }
          },
          {
            text: 'Ok',
            handler: (data) => {
              console.log(data);
              this.dataLocalService.setEmailInBrowser(data.email);
              this.saveInscripcion(data.email);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  saveInscripcion(email) {
    const inscripcion: Inscripcion = {
      cursoId: this.curso.id,
      email
    };
    this.cursosService.saveInscripcion(inscripcion).subscribe(resp => {
      if (resp.status === 0) {
        this.showMessage('Bienvenido al Curso');
      } else if (resp.status === 3) {
        this.showMessage('Ya se encuentra inscripto en el curso');
      } else {
        this.showMessage('Email inválido');
        this.dataLocalService.removeEmailInBrowser();
      }
    }, error => {
      this.showMessage('Ups! no se pudo inscribir');
    });
  }

  refreshButtonSalir() {

  }

  async showMessage(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
