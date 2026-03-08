import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  go_back = '/livestock/'
  menuItems = [
    { label: 'Prestamos', icon: 'assets/icons/prestamo_libro.png', routerLink: '/prestamo/list'},
    { label: 'Estudiantes', icon: 'assets/icons/user.png', routerLink: '/student/list'},
  ];
}
