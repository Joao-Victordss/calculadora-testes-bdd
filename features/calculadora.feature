Feature: Operações básicas da calculadora
    Para realizar cálculos simples
    Como um usuário
    Eu quero usar a calculadora para somar, subtrair, multiplicar e dividir

    Scenario Outline: Realizar operações pela interface gráfica
        Given que abri a interface da calculadora
        When pressiono os botões "<sequencia>"
        Then o visor da calculadora deve mostrar "<resultado>"

        Examples:
            | sequencia    | resultado |
            | 5 + 3 =      | 8         |
            | 9 - 4 =      | 5         |
            | 6 * 7 =      | 42        |
            | 8 / 2 =      | 4         |
            | 12 + 3 =     | 15        |
            | 90 - 45 =    | 45        |
            | 5.5 + 2.5 =  | 8         |
            | 7 / 2 =      | 3.5       |

    Scenario Outline: Realizar operações encadeadas pela interface gráfica
        Given que abri a interface da calculadora
        When pressiono os botões "<sequencia>"
        Then o visor da calculadora deve mostrar "<resultado>"

        Examples:
            | sequencia       | resultado |
            | 5 + 3 * 2 =     | 11        |
            | 8 / 2 + 6 =     | 10        |
            | 9 - 4 + 1 =     | 6         |
            | 10 - 2 * 3 =    | 4         |
            | 20 / 5 * 2 =    | 8         |
            | 2 + 8 / 4 =     | 4         |
            | 100 / 10 - 3 =  | 7         |

    Scenario Outline: Usar controles da interface gráfica
        Given que abri a interface da calculadora
        When pressiono os botões "<sequencia>"
        Then o visor da calculadora deve mostrar "<resultado>"

        Examples:
            | sequencia       | resultado |
            | 12 C            | 0         |
            | 12 backspace    | 1         |
            | 5 + =           | 5         |
            | 1 . . 5         | 1.5       |
            | backspace       | 0         |
            | 9 + 1 C         | 0         |
            | 4 + 3 backspace 2 = | 6      |
            | 7 + 2 C 9 - 4 = | 5         |

    Scenario Outline: Substituir operador antes de informar o segundo número
        Given que abri a interface da calculadora
        When pressiono os botões "<sequencia>"
        Then o visor da calculadora deve mostrar "<resultado>"

        Examples:
            | sequencia       | resultado |
            | 8 + - 3 =       | 5         |
            | 6 * / 2 =       | 3         |
            | 10 - + 5 =      | 15        |

    Scenario Outline: Tratar entradas numéricas de borda
        Given que abri a interface da calculadora
        When pressiono os botões "<sequencia>"
        Then o visor da calculadora deve mostrar "<resultado>"

        Examples:
            | sequencia       | resultado |
            | 0 0 7 + 3 =     | 10        |
            | . 5 + . 25 =    | 0.75      |
            | 1 / 3 =         | 0.3333333333 |
            | 0 / 5 =         | 0         |

    Scenario: Exibir erro ao dividir por zero pela interface gráfica
        Given que abri a interface da calculadora
        When pressiono os botões "8 / 0 ="
        Then o visor da calculadora deve mostrar "Erro"

    Scenario: Permitir nova operação depois de erro por divisão por zero
        Given que abri a interface da calculadora
        When pressiono os botões "8 / 0 = 4 + 2 ="
        Then o visor da calculadora deve mostrar "6"

    Scenario: Falhar quando um botão inexistente for solicitado
        Given que abri a interface da calculadora
        When tento pressionar os botões "5 % 2 ="
        Then a execução da interface deve falhar com "Botão não encontrado: %"
