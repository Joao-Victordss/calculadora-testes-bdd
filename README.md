# Calculadora Web com Testes BDD

Projeto simples de calculadora com interface web e testes BDD usando JavaScript, Cucumber.js e Gherkin.

A aplicação testada é a própria interface web em `app/`. Os cenários BDD simulam o usuário pressionando os botões da calculadora e verificam o valor exibido no visor.

## Estrutura

```text
.
├── app/
│   ├── index.html
│   ├── styles.css
│   └── calculadora.js
├── features/
│   ├── calculadora.feature
│   └── steps/
│       └── calculadora_steps.js
├── tests/
│   └── calculadora_ui_driver.js
├── .gitignore
├── package-lock.json
└── package.json
```

## Requisitos

- Node.js
- npm

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

## Executando a interface gráfica

Abra o arquivo `app/index.html` no navegador ou sirva o projeto localmente:

```bash
npm run start
```

Depois acesse:

```text
http://localhost:8000/app/
```

## Executando os testes

Entre na pasta do projeto e execute:

```bash
cd calculadora_app
npm test
```

Se voce estiver na pasta `bdd`, o Cucumber vai procurar os arquivos do projeto no lugar errado. Por isso o comando deve ser executado dentro de `calculadora_app`, onde estao `features/`, `app/` e `tests/`.

Os testes simulam o comportamento do usuário pressionando os botões da calculadora web e verificando o valor mostrado no visor.

Fluxo dos testes:

1. O Cucumber.js lê os cenários em `features/calculadora.feature`.
2. Cada passo Gherkin é executado pelo código em `features/steps/calculadora_steps.js`.
3. O passo `When pressiono os botões ...` usa `tests/calculadora_ui_driver.js`.
4. O driver carrega `app/calculadora.js`, simula os cliques e devolve o texto do visor.
5. O passo `Then` compara o resultado obtido com o resultado esperado.

## Cenários cobertos

A suíte atual possui 33 cenários BDD e 99 passos executados.

Coberturas principais:

- Operações básicas: soma, subtração, multiplicação e divisão.
- Números com mais de um dígito, como `12 + 3` e `90 - 45`.
- Números decimais, como `5.5 + 2.5`.
- Divisão com resultado decimal, como `7 / 2`.
- Operações encadeadas com precedência matemática, como `5 + 3 * 2`.
- Sequências com multiplicação e divisão antes de soma/subtração.
- Botão limpar (`C`) antes e depois de iniciar uma operação.
- Botão apagar (`backspace`) com número digitado e com visor zerado.
- Substituição de operador antes de informar o segundo número, como `8 + - 3`.
- Entradas com zeros à esquerda, como `007 + 3`.
- Números iniciados por ponto decimal, como `.5 + .25`.
- Divisão por zero exibindo `Erro`.
- Nova operação depois de erro por divisão por zero.
- Tentativa de pressionar botão inexistente, validando erro no driver de teste.

Os cenários estão descritos em `features/calculadora.feature`.

## Arquivos `.feature`

Os arquivos `.feature` usam a sintaxe Gherkin, usada em testes BDD.

Se o editor mostrar o arquivo apenas como texto comum, instale uma extensão de Gherkin/Cucumber. No VS Code, por exemplo:

- Cucumber (Gherkin) Full Support
- Gherkin Syntax Highlighting

## Exemplo de cenário

```gherkin
Feature: Operações básicas da calculadora

    Scenario Outline: Realizar operações pela interface gráfica
        Given que abri a interface da calculadora
        When pressiono os botões "<sequencia>"
        Then o visor da calculadora deve mostrar "<resultado>"

        Examples:
            | sequencia | resultado |
            | 5 + 3 =   | 8         |
            | 9 - 4 =   | 5         |
            | 6 * 7 =   | 42        |
            | 8 / 2 =   | 4         |
```
