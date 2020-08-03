import { Component , OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  public auth2 : any;
  loginForm : FormGroup;
  constructor(private router : Router,
              private fb:FormBuilder,
              private usuarioService : UsuarioService,
              private ngZone: NgZone) {
    this.crearFormularioLogin();
   }

   ngOnInit(): void {
     this.renderButton();
   }
  crearFormularioLogin(){
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || "",[Validators.required,Validators.email]],
      password: ["",Validators.required],
      remember: [false]
    })
  }
  login(){
    this.usuarioService.loginUsuario(this.loginForm.value)
                      .subscribe(resp =>{
                        console.log(resp)
                        if(this.loginForm.get('remember').value){
                          localStorage.setItem('email',this.loginForm.get('email').value)
                        }else{
                          localStorage.removeItem('email')
                        }
                        this.router.navigateByUrl('/dashboard')
                      },(err)=>{
                        console.log(err)
                        Swal.fire('Error','Usuario y/o contraseña incorrectos','error')
                      })
  }
  
   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }
  async startApp () {
      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
    
  };
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
            const id_token = googleUser.getAuthResponse().id_token;
            this.usuarioService.loginGoogleUsuario(id_token)
                            .subscribe(resp=>{
                              this.ngZone.run(()=>{
                                this.router.navigateByUrl('/dashboard');
                              })
                            });
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
