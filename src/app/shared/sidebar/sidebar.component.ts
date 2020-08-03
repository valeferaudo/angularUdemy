import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems : any[];

  constructor(private sideService : SidebarService,
              private usuarioService: UsuarioService,
              private router:Router) { 
    this.menuItems = sideService.menu;
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }
}
