# Sonar

*Quanto mais profundo, mais pesado.*

Loja de instrumentos para música pesada, organizada por profundidade. Na superfície ficam os timbres limpos e brilhantes. Conforme a página desce, o fundo escurece e os instrumentos ficam mais graves, até a zona abissal.

Projeto da disciplina, tema "Da capa para a tela". A capa de partida, o conceito e a ligação com o site estão no [CONCEITO.md](CONCEITO.md).

- Moodboard: [docs/moodboard.png](docs/moodboard.png)
- Identidade visual: [docs/identidade-visual.png](docs/identidade-visual.png)

## Como rodar

O projeto tem duas partes: a API, que fornece os instrumentos, e o site em Angular. A API precisa estar rodando antes do site.

### 1. API (C# / .NET 8 + PostgreSQL)

Repositório: https://github.com/marcooasf/ProdutosApi/tree/Sonar (branch `Sonar`)

Com o PostgreSQL rodando em `localhost:5432`. Antes de rodar, abra o arquivo `appsettings.json` e ajuste o usuário e a senha na linha `ConnectionStrings: Postgres` para os do seu PostgreSQL.

```bash
dotnet restore
dotnet run
```

Na primeira execução ela cria o banco `produtosdb` e insere os 12 instrumentos. A API sobe em `http://localhost:5099` e o Swagger fica em `http://localhost:5099/swagger`.

Se o banco `produtosdb` já existir de uma versão antiga do projeto, apague ele antes, para que seja recriado com os campos novos.

### 2. Site (Angular 22)

```bash
cd sonar
npm install
ng serve
```

Abra `http://localhost:4200`.

## Sobre a API

O enunciado sugere APIs públicas prontas, mas nenhuma delas tem instrumentos musicais com os dados de que o conceito precisa (zona, profundidade e timbre). Por isso o site consome uma API própria, feita a partir do projeto ProdutosApi usado em aula. Ela roda localmente.

Endpoints usados:

| Endpoint | Uso no site |
|---|---|
| `GET /api/produtos/publico?pageSize=50` | lista da home, ordenada por profundidade |
| `GET /api/produtos/{id}` | página de detalhe |

## Onde está cada requisito

| Requisito | Onde ver |
|---|---|
| 3 rotas com menu e destaque da página atual | `app.routes.ts` e o cabeçalho (`routerLinkActive`) |
| Rota com parâmetro | `/instrumento/:id`, em `pages/detalhe` |
| Rota `**` no tema | `pages/nao-encontrada` |
| Componentes com `input()` | `card-instrumento` e `medidor-timbre` |
| Componente com `output()` | `card-instrumento` avisa a home ao clicar em Adicionar |
| `@if`, `@for` com `track` e `@empty` | `home.html` e `carrinho.html` |
| Signals | busca, índice do destaque, menu aberto, itens do carrinho, lista da API |
| Computed | `destaque`, `filtrados` e `porZona` na home; `quantidade`, `total` e `profundidadeMaxima` no carrinho |
| Serviço com `inject()` e HttpClient | `services/instrumento.service.ts` |
| Carregando e erro na tela | home e detalhe |
| Formulário com validação | `pages/suporte` (formulário reativo) |
| Tailwind com as cores da identidade | bloco `@theme` em `src/styles.css` |
| CSS próprio | degradê da descida em `pages/home/home.css` |

## Créditos

- Fontes: Signatra (uso pessoal) no nome do site e Montserrat (Google Fonts) no restante.
- As fotos dos instrumentos são usadas apenas para fins acadêmicos.
- A imagem da capa do álbum não é usada na aplicação.