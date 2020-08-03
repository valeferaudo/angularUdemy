import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { RegisterForm } from '../interfaces/registerForm.interface'
import { LoginForm } from '../interfaces/loginForm.interface';
import { tap, map, catchError} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi:any
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2 : any;
  constructor(private http : HttpClient,
              private router:Router,
              private ngZone: NgZone) {
      this.googleInit();
   }
   
   googleInit(){
     return new Promise(resolve =>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '493277301065-mc3q9o1ukagu5gq7c8pc5k8qf1s7d0tf.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
     })
   })
   }
  crearUsuario(formData : RegisterForm){
    console.log("Servicio creador");
    return this.http.post('http://localhost:3009/api/usuarios/',formData)
                    .pipe(tap((resp:any)=>{
                      localStorage.setItem('token',resp.token)
                    }))
  }
  loginUsuario(formData: LoginForm){
    return this.http.post('http://localhost:3009/api/login/',formData)
                  .pipe(tap((resp:any)=>{
                      localStorage.setItem('token',resp.token)
                  }))
  }
  loginGoogleUsuario(token: string){
    return this.http.post('http://localhost:3009/api/login/google',{token})
                  .pipe(tap((resp:any)=>{
                      localStorage.setItem('token',resp.token)
                  }))
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get('http://localhost:3009/api/login/renew', {
      headers: {
        'x-token':token
      }
    }).pipe(tap((resp:any)=>{
      localStorage.setItem('token',resp.token)
    }),map(resp=>{
      return true
    }),catchError(error =>{
      return of(false)
    })
    )
  }
  
  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login')
      })
    })
  }
}
