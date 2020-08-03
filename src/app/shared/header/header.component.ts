import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService : UsuarioService,
             private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.usuarioService.logout();
  }
}
