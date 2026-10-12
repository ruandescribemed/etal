# ETAL 2026

Site do VIII Encontro de Tecnologia do Alto Oeste Potiguar (IFRN Campus Pau dos Ferros), em [etal.nadic.com.br](https://etal.nadic.com.br).

## Rodar

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:3000
npm run build        # build de produção
npm start            # serve o build
```

## Onde mudar o conteúdo

Todo o conteúdo fica em `src/data/site.ts`: tema, datas, estado das inscrições, programação, palestras, minicursos, e-sports e edições anteriores. Os componentes só leem esse arquivo.

- **Inscrições:** `registration` aceita `{ status: 'soon' }`, `{ status: 'open', url }` ou `{ status: 'closed' }`. Os botões e textos do site mudam sozinhos.
- **Palestrantes:** `speaker` é `{ kind: 'announced', name, role }` ou `{ kind: 'tba', note }` para quem ainda não foi confirmado.
- Itens com `placeholder: true` são dados de exemplo e precisam ser trocados antes de publicar.

## Design

`DESIGN.md` descreve o conceito (o painel de LED feito do grid do IF), a paleta, a tipografia (Doto e Mona Sans) e as regras de movimento.
