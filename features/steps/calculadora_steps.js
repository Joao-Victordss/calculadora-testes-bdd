const assert = require("node:assert/strict");
const { Given, When, Then } = require("@cucumber/cucumber");
const { runCalculator } = require("../../tests/calculadora_ui_driver");

Given("que abri a interface da calculadora", function () {
    this.displayValue = null;
    this.executionError = null;
});

When("pressiono os botões {string}", function (sequence) {
    this.displayValue = runCalculator(sequence);
});

When("tento pressionar os botões {string}", function (sequence) {
    try {
        this.displayValue = runCalculator(sequence);
    } catch (error) {
        this.executionError = error;
    }
});

Then("o visor da calculadora deve mostrar {string}", function (expectedResult) {
    assert.equal(this.displayValue, expectedResult);
});

Then("a execução da interface deve falhar com {string}", function (expectedMessage) {
    assert.ok(
        this.executionError,
        "Esperado falha, mas a execução terminou com sucesso",
    );

    const escapedMessage = expectedMessage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(this.executionError.message, new RegExp(escapedMessage));
});
