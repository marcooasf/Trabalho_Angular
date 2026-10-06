export interface Instrumento {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  estoque: number;
  tipo: string;
  zona: string;
  profundidade: number;
  timbre: number;
  imagemUrl: string | null;
}

export interface Pagina<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
}

export function imagemDe(i: Instrumento): string {
  return i.imagemUrl ?? `/instrumentos/${i.id}.png`;
}