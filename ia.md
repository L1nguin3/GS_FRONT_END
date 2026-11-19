# Declaração de uso de IA – Grupo SONDER

Nós, do grupo **SONDER**, desenvolvemos o **Projeto RAIZ** na Global Solution 2026.2 da FIAP (tema CitizenTech). Durante o trabalho, usamos a inteligência artificial (Claude) como **ferramenta de estudo**, principalmente para tirar dúvidas e treinar. Este documento explica como isso aconteceu.

## Sobre o projeto

O RAIZ é um sensor de umidade do solo para pequenos produtores de hortaliça folhosa do cinturão verde da Região Metropolitana de São Paulo, com um app que projeta em quantas horas será preciso irrigar. O projeto se conecta às ODS 2, 9, 10 e 13.

A solução foi dividida em sete entregas (Matemática, UX, Edge/Wokwi, Python CLI, Front-end, Web Dev/JS e Pitch em vídeo), apresentadas como um único projeto.

## Como estudamos com a IA

Quando travávamos em algum assunto, usávamos a IA para estudar. O caminho foi quase sempre este:

1. Pedíamos uma explicação simples do conceito.
2. Víamos um exemplo pequeno.
3. Fazíamos exercícios de treino.
4. Tentávamos resolver por conta própria.
5. Respondíamos às perguntas que ajudavam a achar o erro.
6. Corrigíamos o código e entendíamos por que ele estava errado.

Assim, a IA serviu como apoio para aprender. O código do projeto foi montado, testado e ajustado por nós.

## Uso por entrega

| Entrega | Como usamos a IA | O que foi feito por nós |
| --- | --- | --- |
| Front-end (landing page, CSS) | Aprender conceitos de CSS e pedir pequenas linhas de código como referência | Estrutura da página, adaptação ao visual do projeto e testes no navegador |
| Web Dev (JavaScript) | Treinar a lógica de programação e tirar dúvidas sobre as linhas do formulário de feedback | Escrita da função, testes e correção das linhas |
| Python (CLI) | Tirar dúvidas sobre os conceitos vistos em aula, como `def` e `match/case` | Montagem do programa e resolução dos exercícios da disciplina |

## CSS: o que aprendemos e aplicamos

Aprendemos CSS com a IA e aplicamos os conceitos na landing page, ajustando tudo ao visual do RAIZ. A tabela mostra o que usamos e onde aparece no código.

| Conceito | Onde aparece | O que aprendemos |
| --- | --- | --- |
| Variáveis CSS (`:root`) | Paleta de verdes, fontes e espaçamentos | Mudar uma cor ou medida em um só lugar atualiza o site todo |
| Flexbox | Menu, destaque, seções e rodapé | Alinhar e distribuir elementos em linha ou em coluna |
| `row-reverse` com `nth-of-type(even)` | Seções que alternam ícone e texto | Inverter a ordem visual sem mexer no HTML |
| `clamp()` e `min()` | Título principal e largura do container | Tamanhos que se adaptam à tela sem várias regras |
| `position: sticky` | Cabeçalho fixo no topo | Manter a navegação sempre visível |
| `@media` (820px e 600px) | Menu, destaque e seções no celular | Reorganizar o layout em telas menores |
| `:focus-visible` | Links usados pelo teclado | Deixar o foco visível, pensando em acessibilidade |
| `transition` e `:hover` | Botões e links do menu | Dar retorno visual ao passar o mouse |

## JavaScript: formulário de feedback

No JavaScript, treinamos a lógica de programação com perguntas e exercícios e depois corrigimos as linhas que precisavam de ajuste. O resultado é a função `enviarFeedback()`, em `js/script.js`, que roda quando a pessoa envia o formulário.

O que entendemos de cada parte:

- `getElementById(...).value.trim()` lê o campo e tira os espaços das pontas, para que só espaços não contem como texto.
- O `if` com `||` confere se algum campo ficou vazio.
- O `return` dentro do `if` interrompe a função, então o agradecimento não aparece com campos vazios.
- O `alert` final usa o nome digitado para personalizar a resposta.
- O `reset()` limpa o formulário depois do envio.

## Nossa responsabilidade

- Só usamos um trecho depois de entender como ele funciona.
- Testamos o resultado no navegador e corrigimos o que não funcionou.
- Tratamos qualquer resposta da IA como sugestão, porque ela pode errar.
- As decisões do projeto (tema, solução, ODS e público) são do grupo.
- Respondemos pelo conteúdo final de todas as entregas.

## Considerações finais

Usamos a IA para aprender e tirar dúvidas de CSS, JavaScript e Python. O projeto, as decisões e o código final são trabalho do grupo SONDER.

**Grupo SONDER** · Global Solution 2026.2 · FIAP
