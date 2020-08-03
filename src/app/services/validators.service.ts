import { Injectable } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  passIguales(password1 : string, password2:string){

    return (formGroup : FormGroup) =>{
      const pass1Control = formGroup.controls[password1];
      const pass2Control = formGroup.controls[password2];
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }
      else{
        pass2Control.setErrors({noEsIgual:true});
      }
    }

  }
}
