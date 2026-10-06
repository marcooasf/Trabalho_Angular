import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InstrumentoService } from '../../services/instrumento.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { MedidorTimbre } from '../../components/medidor-timbre/medidor-timbre';
import { Instrumento, imagemDe } from '../../models/instrumento';

@Component({
  selector: 'app-detalhe',
  imports: [CurrencyPipe, RouterLink, MedidorTimbre],
  templateUrl: './detalhe.html',
})
export class Detalhe {
  private rota = inject(ActivatedRoute);
  private servico = inject(InstrumentoService);
  carrinho = inject(CarrinhoService);
  imagemDe = imagemDe;

  instrumento = signal<Instrumento | null>(null);
  carregando = signal(true);
  erro = signal(false);

  constructor() {
    const id = Number(this.rota.snapshot.paramMap.get('id'));
    this.servico.buscarPorId(id).subscribe({
      next: (instrumento) => {
        this.instrumento.set(instrumento);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }
}