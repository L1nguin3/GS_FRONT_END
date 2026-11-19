<p align="center">
  <img src="img/logo.svg" alt="Logo RAIZ: broto de duas folhas dentro de um círculo verde-claro" width="100">
</p>

<h1 align="center">RAIZ</h1>

<p align="center"><em>Mais cuidado com a água. Mais força para cultivar.</em></p>

Landing page do **Projeto RAIZ**, desenvolvida pelo grupo **SONDER** para a Global Solution 2026.2 da FIAP (tema CitizenTech).

![Página inicial do RAIZ](docs/home.png)

## Sobre o projeto

O RAIZ é um sensor de umidade do solo para pequenos produtores de hortaliça folhosa do cinturão verde da Região Metropolitana de São Paulo. Um app projeta em quantas horas será preciso irrigar, o que ajuda a economizar água e a proteger a colheita.

O projeto se conecta às ODS **2** (Fome zero), **9** (Indústria, inovação e infraestrutura), **10** (Redução das desigualdades) e **13** (Ação contra a mudança do clima).

## Seções da página

- **Problema**: o desafio de irrigar sem desperdício
- **Tecnologia**: como o sensor e o app funcionam
- **Objetivos**: o que o RAIZ quer alcançar
- **Público-alvo**: quem o projeto atende
- **Benefícios**: o ganho para o produtor
- **Acessibilidade**: quatro caminhos para a mesma informação (interface facilitada, voz, mascote e suporte humano)
- **Feedback**: formulário para o visitante deixar sua opinião

## MVP simulado

Além da landing page, o RAIZ tem um **protótipo navegável do aplicativo**, publicado em um projeto separado na Vercel. Ele mostra como o produtor usaria o RAIZ no dia a dia.

**Site:** https://raiz-sonder.vercel.app  
**App:** https://raiz-sonder-app.vercel.app

> **Protótipo simulado gerado com inteligência artificial.** Os dados são fictícios e não vêm de um sensor real. O aviso aparece em todas as telas.

| Tela | O que mostra |
| --- | --- |
| **Início** | Umidade atual em número grande, o estado em uma palavra, o mascote e em quantas horas irrigar |
| **Canteiros** | Alface, rúcula e couve, cada um com número, estado, ícone e mascote |
| **Histórico** | Resumo simples das últimas 24 horas e, se a pessoa quiser, o gráfico técnico |
| **Ajuda** | Contato com a cooperativa e a Casa da Agricultura, e explicação do mascote |

**Os quatro caminhos da acessibilidade, ao mesmo tempo:**

- **Interface facilitada:** número grande, uma palavra só, ícone antes do texto e alvos de toque de 44 px.
- **Dados por voz:** o botão "Ouvir" lê a leitura e a recomendação em português simples.
- **Mascote interativo:** as cinco expressões mudam conforme o estado do solo.
- **Suporte por equipe:** atendimento humano sempre a um toque.

<p align="center">
  <img src="img/mascote/01-encharcado.svg" alt="Mascote encharcado" width="70">
  <img src="img/mascote/02-solo-ok.svg" alt="Mascote com solo ok" width="70">
  <img src="img/mascote/03-atencao.svg" alt="Mascote em atenção" width="70">
  <img src="img/mascote/04-irrigar-agora.svg" alt="Mascote pedindo para irrigar agora" width="70">
  <img src="img/mascote/05-sensor-falhou.svg" alt="Mascote com o sensor falhou" width="70">
  <br>
  <sub>Encharcado · Solo ok · Atenção · Irrigar agora · Sensor falhou</sub>
</p>

O protótipo segue a mesma identidade visual da landing page. Um botão "Simular nova leitura" sorteia um dos cinco estados para demonstrar o funcionamento.

## Tecnologias

- **HTML5**: estrutura semântica (`header`, `main`, `section`, `footer`)
- **CSS3**: variáveis, Flexbox, `clamp()`, `position: sticky` e layout responsivo com `@media`
- **JavaScript**: validação e envio do formulário de feedback

## Estrutura

```
GS_FRONT_END/
├── index.html       # página principal
├── css/styles.css   # estilos
├── js/script.js     # função enviarFeedback()
├── app/             # MVP simulado do aplicativo
├── img/             # imagens das seções
│   └── mascote/     # as cinco expressões do mascote
├── docs/            # print da home usado no README
├── ia.md            # declaração de uso de IA
└── INTEGRANTES.md
```

## Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/L1nguin3/GS_FRONT_END.git
   ```
2. Abra o arquivo `index.html` no navegador. O app fica em `app/index.html`.

Não é preciso instalar nada.

## Integrantes

| Nome | RM |
| --- | --- |
| Guilherme Andrade Dos Santos Trevisan | 576676 |
| João Victor Matos de Almeida | 574928 |
| David Manoel Barros Pereira | 576915 |
| Lucas dos Santos Gomes | 576912 |
| Thales Bernardino Seixas | 574617 |

## Uso de IA

Veja como o grupo usou IA como ferramenta de estudo em [ia.md](ia.md).

---

**Grupo SONDER** · Global Solution 2026.2 · FIAP
