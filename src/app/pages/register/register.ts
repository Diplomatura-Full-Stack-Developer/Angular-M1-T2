import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  REGISTER_FORM_SCHEMA,
  RegisterField,
  fieldErrorMessage,
} from '../../validators/register-form.schema';
import { ConfirmDialog } from '../../shared/ui/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './register.html',
})
export class Register {
  title: string = 'Registro de usuario';
  description: string = 'Por favor, complete el formulario para registrarse.';

  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);

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
      console.log('Formulario inválido');
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.registerForm.value;

    this.dialog
      .open(ConfirmDialog, {
        data: {
          title: 'Formulario enviado correctamente',
          name: `Nombre: ${name}`,
          email: `Email: ${email}`,
          message: `Mensaje: ${message}`,
        },
        restoreFocus: false,
      })
      .afterClosed()
      .subscribe(() => {
        this.registerForm.reset();
      });
  }
}
