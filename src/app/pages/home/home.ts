import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InstrumentoService } from '../../services/instrumento.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { CardInstrumento } from '../../components/card-instrumento/card-instrumento';
import { Instrumento, imagemDe } from '../../models/instrumento';

@Component({
  selector: 'app-home',
  imports: [CardInstrumento, CurrencyPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  servico = inject(InstrumentoService);
  carrinho = inject(CarrinhoService);
  imagemDe = imagemDe;

  busca = signal('');
  indice = signal(2);

  zonas = [
    { nome: 'Iluminada', faixa: '0 a 200m' },
    { nome: 'Crepuscular', faixa: '200 a 1000m' },
    { nome: 'Abissal', faixa: 'abaixo de 4000m' },
  ];

  destaque = computed(() => {
    const lista = this.servico.instrumentos();
    return lista.length ? lista[this.indice() % lista.length] : null;
  });

  filtrados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    return this.servico
      .instrumentos()
      .filter((i) => i.nome.toLowerCase().includes(termo) || i.tipo.toLowerCase().includes(termo));
  });

  porZona = computed(() =>
    this.zonas.map((zona) => ({
      ...zona,
      itens: this.filtrados().filter((i) => i.zona === zona.nome),
    })),
  );

  constructor() {
    this.servico.carregar();
  }

  proximo() {
    this.indice.update((i) => i + 1);
  }

  anterior() {
    const total = this.servico.instrumentos().length;
    this.indice.update((i) => (i - 1 + total) % total);
  }

  adicionar(instrumento: Instrumento) {
    this.carrinho.adicionar(instrumento);
  }

  menuAberto = signal(false);

  irPara(zona: string) {
    this.menuAberto.set(false);
    document.getElementById('zona-' + zona)?.scrollIntoView({ behavior: 'smooth' });
  }
}