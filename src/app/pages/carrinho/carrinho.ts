import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { imagemDe } from '../../models/instrumento';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carrinho.html',
})
export class Carrinho {
  carrinho = inject(CarrinhoService);
  imagemDe = imagemDe;
}