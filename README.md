# calculadora-testes-bdd

Projeto simples de calculadora com interface web e testes BDD usando Python e Behave.

## Estrutura

```text
.
├── features/
│   ├── calculadora.feature
│   └── steps/
│       └── calculadora_steps.py
├── app/
│   ├── index.html
│   ├── styles.css
│   └── calculadora.js
├── tests/
│   └── calculadora_ui_driver.js
├── src/
│   └── calculadora.py
├── .gitignore
└── requirements.txt
```

## Requisitos

- Python 3
- pip
- Node.js

## Instalação

Instale as dependências do projeto:

```bash
python3 -m pip install -r requirements.txt
```

## Executando a interface gráfica

Abra o arquivo `app/index.html` no navegador ou sirva o projeto localmente:

```bash
python3 -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000/app/
```

## Executando os testes

Entre na pasta do projeto e execute:

```bash
cd calculadora_app
python3 -m behave
```

Se voce estiver na pasta `bdd`, o Behave vai procurar uma pasta `features` ali. Por isso o comando deve ser executado dentro de `calculadora_app`, onde estao `features/`, `app/`, `tests/` e `src/`.

Os testes da interface simulam o comportamento do usuário pressionando os botões da calculadora web e verificando o valor mostrado no visor.

## Cenários cobertos

A suíte atual possui 34 cenários BDD e 102 passos executados.

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
