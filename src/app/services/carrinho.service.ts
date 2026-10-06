import { Injectable, computed, signal } from '@angular/core';
import { Instrumento } from '../models/instrumento';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  itens = signal<Instrumento[]>([]);

  quantidade = computed(() => this.itens().length);
  total = computed(() => this.itens().reduce((soma, item) => soma + item.preco, 0));

  adicionar(instrumento: Instrumento) {
    this.itens.update((lista) => [...lista, instrumento]);
  }

  remover(indice: number) {
    this.itens.update((lista) => lista.filter((_, i) => i !== indice));
  }

  profundidadeMaxima = computed(() => Math.max(0, ...this.itens().map((i) => i.profundidade)));
}