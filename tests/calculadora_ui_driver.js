const path = require("path");

const buttons = [
    { selector: ".key", dataset: { action: "clear" }, textContent: "C" },
    { selector: ".key", dataset: { action: "backspace" }, textContent: "⌫" },
    { selector: ".key", dataset: { value: "/" }, textContent: "÷" },
    { selector: ".key", dataset: { value: "*" }, textContent: "×" },
    { selector: ".key", dataset: { value: "7" }, textContent: "7" },
    { selector: ".key", dataset: { value: "8" }, textContent: "8" },
    { selector: ".key", dataset: { value: "9" }, textContent: "9" },
    { selector: ".key", dataset: { value: "-" }, textContent: "−" },
    { selector: ".key", dataset: { value: "4" }, textContent: "4" },
    { selector: ".key", dataset: { value: "5" }, textContent: "5" },
    { selector: ".key", dataset: { value: "6" }, textContent: "6" },
    { selector: ".key", dataset: { value: "+" }, textContent: "+" },
    { selector: ".key", dataset: { value: "1" }, textContent: "1" },
    { selector: ".key", dataset: { value: "2" }, textContent: "2" },
    { selector: ".key", dataset: { value: "3" }, textContent: "3" },
    { selector: ".key", dataset: { action: "equals" }, textContent: "=" },
    { selector: ".key", dataset: { value: "0" }, textContent: "0" },
    { selector: ".key", dataset: { value: "." }, textContent: "." },
];

const display = {
    textContent: "0",
};

function createButton(definition) {
    const listeners = {};

    return {
        dataset: definition.dataset,
        textContent: definition.textContent,
        addEventListener(eventName, handler) {
            listeners[eventName] = handler;
        },
        click() {
            listeners.click({ currentTarget: this });
        },
        matches(selector) {
            return selector === definition.selector;
        },
    };
}

const buttonElements = buttons.map(createButton);

global.document = {
    addEventListener(eventName, handler) {
        if (eventName === "DOMContentLoaded") {
            handler();
        }
    },
    querySelector(selector) {
        if (selector === "#display") {
            return display;
        }

        return null;
    },
    querySelectorAll(selector) {
        if (selector === ".key") {
            return buttonElements;
        }

        return [];
    },
};

require(path.join(__dirname, "..", "app", "calculadora.js"));

function findButton(token) {
    return buttonElements.find((button) => (
        button.dataset.value === token ||
        button.dataset.action === token ||
        button.textContent === token
    ));
}

const sequence = process.argv.slice(2);

for (const token of sequence) {
    const button = findButton(token);

    if (!button) {
        throw new Error(`Botão não encontrado: ${token}`);
    }

    button.click();
}

process.stdout.write(display.textContent);
