import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-suporte',
  imports: [ReactiveFormsModule],
  templateUrl: './suporte.html',
})
export class Suporte {
  private fb = inject(FormBuilder);
  enviado = signal(false);

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

  enviar() {
    if (this.form.invalid) return;
    this.enviado.set(true);
    this.form.reset();
  }
}