import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Detalhe } from './pages/detalhe/detalhe';
import { Carrinho } from './pages/carrinho/carrinho';
import { Suporte } from './pages/suporte/suporte';
import { NaoEncontrada } from './pages/nao-encontrada/nao-encontrada';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'instrumento/:id', component: Detalhe },
  { path: 'carrinho', component: Carrinho },
  { path: 'suporte', component: Suporte },
  { path: '**', component: NaoEncontrada },
];