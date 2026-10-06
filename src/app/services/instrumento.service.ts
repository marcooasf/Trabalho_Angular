import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instrumento, Pagina } from '../models/instrumento';

@Injectable({ providedIn: 'root' })
export class InstrumentoService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5099/api/produtos';

  instrumentos = signal<Instrumento[]>([]);
  carregando = signal(false);
  erro = signal<string | null>(null);

  carregar() {
    this.carregando.set(true);
    this.erro.set(null);

    this.http
      .get<Pagina<Instrumento>>(`${this.url}/publico?pageSize=50`)
      .subscribe({
        next: (pagina) => {
          this.instrumentos.set(pagina.items);
          this.carregando.set(false);
        },
        error: () => {
          this.erro.set('O sonar perdeu o sinal. Verifique se a API está no ar.');
          this.carregando.set(false);
        },
      });
  }

  buscarPorId(id: number) {
    return this.http.get<Instrumento>(`${this.url}/${id}`);
  }
}