import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  go_back = '/livestock/'
  menuItems = [
    { label: 'Prestamos', icon: 'assets/icons/prestamo_libro.png', routerLink: '/loan/list'},
    { label: 'Top5', icon: 'assets/icons/star_5.png', routerLink: '/loan/top'},
    { label: 'Estudiantes', icon: 'assets/icons/user.png', routerLink: '/student/list'},
  ];
}
