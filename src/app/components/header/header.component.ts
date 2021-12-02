import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DataLocalService} from '../../services/data-local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Input() titulo = '';
  showSalir = false;

  constructor(private dataLocalService: DataLocalService) {
  }

  ngOnInit() {
    if (this.dataLocalService.getEmailInBrowser()) {
      this.showSalir = true;
    } else {
      this.showSalir = false;
    }
  }

  salir() {
    this.dataLocalService.removeEmailInBrowser();
    this.showSalir = false;
  }

  ngAfterViewInit(): void {
  }
}
