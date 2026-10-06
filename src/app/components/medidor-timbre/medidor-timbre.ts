import { Component, input } from '@angular/core';

@Component({
  selector: 'app-medidor-timbre',
  templateUrl: './medidor-timbre.html',
})
export class MedidorTimbre {
  nivel = input.required<number>();
  pontos = [1, 2, 3, 4, 5];
}