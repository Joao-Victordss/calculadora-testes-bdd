from behave import given, when, then
import subprocess
from src.calculadora import Calculadora

@given('que iniciei a calculadora')
def step_iniciar_calculadora(context):
    context.calculadora = Calculadora()

@when('soma {a:d} e {b:d}')
def step_somar(context, a, b):
    context.resultado = context.calculadora.somar(a, b)

@then('o resultado deve ser {resultado:d}')
def step_verificar_soma(context, resultado):
    assert context.resultado == resultado, f"Esperado {resultado}, mas obteve {context.resultado}"

@given('que abri a interface da calculadora')
def step_abrir_interface(context):
    context.interface_aberta = True

def preparar_tokens(sequencia):
    tokens = []

    for token in sequencia.split():
        if token.replace(".", "", 1).isdigit():
            tokens.extend(token)
        else:
            tokens.append(token)

    return tokens

@when('pressiono os botões "{sequencia}"')
def step_pressionar_botoes(context, sequencia):
    tokens = preparar_tokens(sequencia)
    processo = subprocess.run(
        ["node", "tests/calculadora_ui_driver.js", *tokens],
        check=True,
        capture_output=True,
        text=True,
    )
    context.resultado_interface = processo.stdout.strip()

@when('tento pressionar os botões "{sequencia}"')
def step_tentar_pressionar_botoes(context, sequencia):
    tokens = preparar_tokens(sequencia)
    context.processo_interface = subprocess.run(
        ["node", "tests/calculadora_ui_driver.js", *tokens],
        capture_output=True,
        text=True,
    )

@then('o visor da calculadora deve mostrar "{resultado}"')
def step_verificar_visor(context, resultado):
    assert context.resultado_interface == resultado, (
        f"Esperado que o visor mostrasse {resultado}, "
        f"mas mostrou {context.resultado_interface}"
    )

@then('a execução da interface deve falhar com "{mensagem}"')
def step_verificar_falha_interface(context, mensagem):
    assert context.processo_interface.returncode != 0, "Esperado falha, mas a execução terminou com sucesso"
    saida_erro = context.processo_interface.stderr
    assert mensagem in saida_erro, f"Esperado erro com '{mensagem}', mas recebeu: {saida_erro}"
