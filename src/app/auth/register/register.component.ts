import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { ValidatorsService } from 'src/app/services/validators.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {
  public registerForm : FormGroup;
  constructor(private fb: FormBuilder,
              private validator : ValidatorsService,
              private usuarioService : UsuarioService,
              private router: Router) {
    this.crearFormulario();
   }

  get pass2Valido(){
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value
    return (pass1 === pass2)?false:true;
  }
  crearFormulario(){
    this.registerForm = this.fb.group({
      nombre:["Sol",[Validators.required,Validators.minLength(3)]],
      email:["sol.salin@gmail.com",[Validators.required, Validators.email]],
      password:["123456",[Validators.required]],
      password2:["123456",[Validators.required]],
      terminos:[true,[Validators.required]]
    },{validators:this.validator.passIguales("password","password2")})
  }

  crearUsuario(){
    if(this.registerForm.invalid){
      Object.values(this.registerForm.controls).forEach(control=>{
        control.markAsTouched();
      });
      return;
    }
    //Se llama al metodo
    this.usuarioService.crearUsuario(this.registerForm.value)
                        .subscribe(resp =>{
                          this.router.navigateByUrl('/dashboard')
                        }, (err) =>{
                            Swal.fire('Error',err.error.msg,'error')                        })
  }
  campoNoValido(campo:string){
    return this.registerForm.get(campo).invalid && this.registerForm.get(campo).touched
  }
  validarCheck(){
    return !this.registerForm.get('terminos').value &&  this.registerForm.get('terminos').touched
  }
}
