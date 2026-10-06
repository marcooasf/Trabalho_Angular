import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MedidorTimbre } from '../medidor-timbre/medidor-timbre';
import { Instrumento, imagemDe } from '../../models/instrumento';

@Component({
  selector: 'app-card-instrumento',
  imports: [CurrencyPipe, RouterLink, MedidorTimbre],
  templateUrl: './card-instrumento.html',
})
export class CardInstrumento {
  instrumento = input.required<Instrumento>();
  adicionar = output<Instrumento>();
  imagemDe = imagemDe;
}