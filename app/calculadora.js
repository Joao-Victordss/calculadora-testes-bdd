(function () {
    const state = {
        expression: [],
        waitingForSecondValue: false,
        displayValue: "0",
    };

    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => {
            if (b === 0) {
                throw new Error("Divisão por zero não é permitida.");
            }
            return a / b;
        },
    };

    function formatNumber(value) {
        if (!Number.isFinite(value)) {
            return "Erro";
        }

        return Number.parseFloat(value.toFixed(10)).toString();
    }

    function updateDisplay() {
        const display = document.querySelector("#display");
        display.textContent = state.displayValue;
    }

    function inputDigit(digit) {
        if (state.displayValue === "Erro") {
            clearCalculator();
        }

        if (state.waitingForSecondValue) {
            state.displayValue = digit;
            state.waitingForSecondValue = false;
            updateDisplay();
            return;
        }

        state.displayValue = state.displayValue === "0" ? digit : state.displayValue + digit;
        updateDisplay();
    }

    function inputDecimal() {
        if (state.waitingForSecondValue) {
            state.displayValue = "0.";
            state.waitingForSecondValue = false;
            updateDisplay();
            return;
        }

        if (!state.displayValue.includes(".")) {
            state.displayValue += ".";
            updateDisplay();
        }
    }

    function clearCalculator() {
        state.expression = [];
        state.waitingForSecondValue = false;
        state.displayValue = "0";
        updateDisplay();
    }

    function backspace() {
        if (state.waitingForSecondValue || state.displayValue === "Erro") {
            return;
        }

        state.displayValue = state.displayValue.length > 1
            ? state.displayValue.slice(0, -1)
            : "0";
        updateDisplay();
    }

    function calculate(firstValue, secondValue, operator) {
        return operations[operator](firstValue, secondValue);
    }

    function evaluateExpression(expression) {
        const tokens = [...expression];

        for (let index = 1; index < tokens.length - 1; index += 2) {
            const operator = tokens[index];

            if (operator === "*" || operator === "/") {
                const result = calculate(tokens[index - 1], tokens[index + 1], operator);
                tokens.splice(index - 1, 3, result);
                index -= 2;
            }
        }

        let result = tokens[0];

        for (let index = 1; index < tokens.length - 1; index += 2) {
            result = calculate(result, tokens[index + 1], tokens[index]);
        }

        return result;
    }

    function handleOperator(nextOperator) {
        const inputValue = Number.parseFloat(state.displayValue);

        if (state.waitingForSecondValue) {
            state.expression[state.expression.length - 1] = nextOperator;
            return;
        }

        state.expression.push(inputValue, nextOperator);
        state.waitingForSecondValue = true;
        updateDisplay();
    }

    function handleEquals() {
        if (state.expression.length === 0 || state.waitingForSecondValue) {
            return;
        }

        const secondValue = Number.parseFloat(state.displayValue);

        try {
            const result = evaluateExpression([...state.expression, secondValue]);
            state.displayValue = formatNumber(result);
        } catch (error) {
            state.displayValue = "Erro";
        }

        state.expression = [];
        state.waitingForSecondValue = true;
        updateDisplay();
    }

    function handleKeyClick(event) {
        const key = event.currentTarget;
        const value = key.dataset.value;
        const action = key.dataset.action;

        if (value >= "0" && value <= "9") {
            inputDigit(value);
            return;
        }

        if (value === ".") {
            inputDecimal();
            return;
        }

        if (operations[value]) {
            handleOperator(value);
            return;
        }

        if (action === "clear") {
            clearCalculator();
            return;
        }

        if (action === "backspace") {
            backspace();
            return;
        }

        if (action === "equals") {
            handleEquals();
        }
    }

    function initializeCalculator() {
        document.querySelectorAll(".key").forEach((key) => {
            key.addEventListener("click", handleKeyClick);
        });
        updateDisplay();
    }

    if (typeof document !== "undefined") {
        document.addEventListener("DOMContentLoaded", initializeCalculator);
    }

    if (typeof module !== "undefined") {
        module.exports = { initializeCalculator, state };
    }
}());
