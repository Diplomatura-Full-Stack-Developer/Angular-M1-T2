import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { REGISTER_FORM_SCHEMA } from '../../validators/register-form.schema';
import { NgClass } from '@angular/common';
import { RegisterField, fieldErrorMessage } from '../../validators/register-form.schema';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.html',
})
export class Register {
  title: string = 'Registro de usuario';
  description: string = 'Por favor, complete el formulario para registrarse.';

  private formBuilder = inject(FormBuilder)


  registerForm = this.formBuilder.group({
    name: ['', REGISTER_FORM_SCHEMA.name.validators],
    email: ['', REGISTER_FORM_SCHEMA.email.validators],
    message: ['', REGISTER_FORM_SCHEMA.message.validators],
  });

  isInvalid(field: RegisterField): boolean {
    const control = this.registerForm.controls[field];
    return control.touched && control.invalid;
  }
  errorMessage(field: RegisterField): string | null {
    return fieldErrorMessage(field, this.registerForm.controls[field]);
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      console.log("Formulario inválido");
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value);
  }
}

